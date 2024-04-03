import logging
import os
import signal
import sys
from asyncio import sleep

import aiotieba
from argon2 import PasswordHasher
from environs import Env
from sanic import Sanic, Request, response
from sanic.log import LOGGING_CONFIG_DEFAULTS, logger
from sanic.views import HTTPMethodView
from sanic_ext import Extend
from sanic_jwt import Initialize, protected, scoped, inject_user
from tortoise.contrib.sanic import register_tortoise

from core.exception import ArgException, err_rps
from core.jwt import authenticate, retrieve_user, JwtConfig, JwtResponse, scope_extender
from core.manager import manager
from core.models import User, Config, Permission, ForumUserPermission, ExecuteLog
from core.utils import validate_password, get_modules, json

LOG_FILE_PATH = "./log/server.log"
LOGGING_CONFIG = LOGGING_CONFIG_DEFAULTS
LOGGING_CONFIG.update({
    "handlers": {
        "console": {
            "class": "logging.handlers.RotatingFileHandler",
            "formatter": "generic",
            "filename": LOG_FILE_PATH,
            'encoding': "utf-8",
            'maxBytes': 1024 * 1024 * 1,
            'backupCount': 10,
        },
        "error_console": {
            "class": "logging.handlers.RotatingFileHandler",
            "formatter": "generic",
            "filename": LOG_FILE_PATH,
            'encoding': "utf-8",
            'maxBytes': 1024 * 1024 * 1,
            'backupCount': 10,
        },
        "access_console": {
            "class": "logging.StreamHandler",
            "formatter": "access",
            "stream": sys.stdout,
        },
    },
})

if not os.path.exists('./log'):
    os.makedirs('./log')

if not os.path.exists('./.cache'):
    os.makedirs('./.cache')

app = Sanic("tieba-admin-server", log_config=LOGGING_CONFIG)
Extend(app)
app.ctx.env = Env()
app.ctx.env.read_env(recurse=False)
app.ctx.DB_URL = app.ctx.env.str("DB_URL", "sqlite://.cache/db.sqlite")

if app.ctx.DB_URL.startswith("sqlite") and not os.path.exists(app.ctx.DB_URL.replace("sqlite://", "")):
    open(app.ctx.DB_URL.replace("sqlite://", ""), 'w').close()

app.blueprint(manager)

models = ['core.models']

if app.ctx.env.bool("DEV", False):
    logger.setLevel(logging.DEBUG)
aiotieba.logging.set_logger(logger)

register_tortoise(app, db_url=app.ctx.DB_URL, modules={'models': models}, generate_schemas=True)
Initialize(app, authenticate=authenticate,
           retrieve_user=retrieve_user,
           configuration_class=JwtConfig,
           responses_class=JwtResponse,
           add_scopes_to_payload=scope_extender)

plugins = get_modules("./plugins")
for plugin_name, plugin in plugins.items():
    app.blueprint(plugin.bp)
    try:
        models.append(plugin.models.__name__)
    except AttributeError:
        pass


@app.before_server_start
async def init_server(_app: Sanic):
    if (await Config.get_bool(key="first")) is None:
        await Config.set_config(key="first", v1=True)

    for _plugin in plugins.values():
        try:
            _plugin.plugin.before_start()
            await _plugin.plugin.async_before_start()
        except Exception:
            pass

    _app.shared_ctx.password_hasher = PasswordHasher()


@app.on_request
async def first_login_check(rqt: Request):
    is_first = await Config.get_bool(key="first")
    if is_first and rqt.path != '/api/first_login' and rqt.path.startswith("/api"):
        return response.json({"is_first": True}, 403)


@app.post('/api/first_login')
async def first_login_api(rqt: Request):
    """第一次登录接口

    用于第一次登录时填入初始化设置信息
    """
    try:
        is_first = await Config.get_bool(key="first")
        if not is_first:
            return response.json({"status": 403, "msg": "不是首次登录"})
        if not (rqt.form.get('BDUSS') and rqt.form.get('fname')
                and rqt.form.get('password') and rqt.form.get('STOKEN')):
            raise ArgException
        validate_password(rqt.form.get('password'))

        async with aiotieba.Client(rqt.form.get('BDUSS'), rqt.form.get('STOKEN')) as client:
            user = await client.get_self_info()
            fid = await client.get_fid(rqt.form.get('fname'))
        user = await User.create(
            uid=user.user_id,
            tuid=user.tieba_uid,
            username=user.user_name,
            password=rqt.app.shared_ctx.password_hasher.hash(rqt.form.get('password')),
            BDUSS=rqt.form.get('BDUSS'),
            STOKEN=rqt.form.get('STOKEN'),
        )
        await ForumUserPermission.create(
            fid=fid,
            fname=rqt.form.get('fname'),
            user=user,
            permission=Permission.Master.value,
        )
        await Config.set_config(key="first", v1=False)
        return response.json({"status": 200, "msg": "成功创建超级管理员"})
    except ArgException as err:
        return err_rps(err)


@app.get("/api/plugins")
@protected()
@scoped(Permission.min(), False)
async def get_plugins(rqt: Request):
    """获取所有插件的名字

    """
    return json(data=list(plugins.keys()))


class PluginsStatus(HTTPMethodView):
    @protected()
    @scoped(Permission.min(), False)
    async def get(self, rqt: Request):
        """获取插件状态

        """
        _plugin = rqt.args.get("plugin")
        if _plugin not in plugins.keys():
            return json("插件不存在", {"status": False})
        plugin_work: dict = rqt.app.m.workers.get(f"Sanic-{_plugin}-0")
        return json("插件状态", {"status": bool(plugin_work)})

    @protected()
    @scoped(Permission.high(), False)
    async def post(self, rqt: Request):
        """设置插件状态

        """
        status = rqt.form.get("status")
        _plugin = rqt.form.get("plugin")
        if _plugin not in plugins.keys():
            return json("插件不存在", {"status": False})
        plugin_work = rqt.app.m.workers.get(f"Sanic-{_plugin}-0", None)
        if status == "1" and plugin_work:
            return json("插件已在运行", {"status": True})
        elif status == "1" and not plugin_work:
            rqt.app.m.manage(_plugin, plugins[_plugin].plugin.start_plugin_with_process,
                             {
                                 "db_url": rqt.app.ctx.DB_URL,
                                 "log_level": logger.level,
                                 "models": models,
                             })
            await sleep(1)
            plugin_work: dict = rqt.app.m.workers.get(f"Sanic-{_plugin}-0")
            plugin_work.pop("start_at")
            plugin_work["status"] = True
            return json("已启动插件", plugin_work)
        elif status == "0" and plugin_work:
            os.kill(plugin_work["pid"], signal.SIGTERM)
            return json("已停止插件", {"status": False})
        elif status == "0" and not plugin_work:
            return json("插件未运行", {"status": False})
        elif status is None:
            return json("插件状态", {"status": bool(plugin_work)})
        else:
            return json("参数错误")


app.add_route(PluginsStatus.as_view(), "/api/plugins/status")


@app.get("/api/self/portrait")
@inject_user()
@protected()
@scoped(Permission.min(), False)
async def get_portrait(rqt: Request, user: User):
    """获取用于获取贴吧用户头像的portrait值

    """
    async with aiotieba.Client() as client:
        _user = await client.get_user_info(user.uid)
    return json(data=_user.portrait)


@app.get("/api/logs/exec")
@protected()
@scoped(Permission.min(), False)
async def get_log(rqt: Request):
    try:
        limit = int(rqt.args.get("limit", 20))

        if limit > 50 or limit <= 0:
            limit = 50
        pn = int(rqt.args.get("pn", 1))
        if pn < 1:
            pn = 1
    except (TypeError, ValueError):
        return json("参数错误")
    offset = (pn - 1) * limit
    logs = await ExecuteLog.all().offset(offset).limit(limit)
    return json(data={"items": [await log.to_dict() for log in logs], "total": await ExecuteLog.all().count()})


if app.ctx.env.bool("WEB", True):
    app.static("/", "./web/", index="index.html")

if __name__ == "__main__":
    app.run(
        host=app.ctx.env.str("HOST", "0.0.0.0"),
        port=app.ctx.env.int("PORT", 3100),
        dev=app.ctx.env.bool("DEV", False),
        workers=app.ctx.env.int("WORKERS", 1),
    )
