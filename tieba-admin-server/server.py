import os
import signal
import sys
from asyncio import sleep

import aiotieba
from sanic import Sanic, Request, response
from sanic.log import LOGGING_CONFIG_DEFAULTS, logger, Colors
from sanic.views import HTTPMethodView
from sanic_ext import Extend
from sanic_jwt import Initialize
from tortoise.contrib.sanic import register_tortoise

from core import level_protected
from core.exception import ArgException, err_rps
from core.jwt import authenticate, retrieve_user, JwtConfig, JwtResponse
from core.models import User, Config, password_hasher, Permission, ForumUserPermission
from core.utils import validate_password, get_modules, json

aiotieba.logging.set_logger(logger)
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

app = Sanic("tieba-admin-server", log_config=LOGGING_CONFIG)
Extend(app)
app.ctx.DB_URL = "sqlite://.cache/db.sqlite"
Initialize(app, authenticate=authenticate,
           retrieve_user=retrieve_user,
           configuration_class=JwtConfig,
           responses_class=JwtResponse)

models = ['core.models']
plugins = get_modules("./plugins")
for plugin_name, plugin in plugins.items():
    app.blueprint(plugin.bp)
    try:
        models.append(plugin.models.__name__)
    except AttributeError:
        pass
    logger.debug(f"{Colors.GREEN}[{plugin.__name__}]{Colors.END} Import.")

register_tortoise(app, db_url=app.ctx.DB_URL, modules={'models': models}, generate_schemas=True)


@app.before_server_start
async def init_server(_app):
    if (await Config.get_bool(key="first")) is None:
        await Config.set_config(key="first", v1=True)


@app.on_request
async def first_login_check(rqt: Request):
    is_first = await Config.get_bool(key="first")
    if is_first and rqt.path != '/api/first_login':
        return response.json({"is_first": True}, 403)


@app.post('/api/first_login')
async def first_login_api(rqt: Request):
    try:
        is_first = await Config.get_bool(key="first")
        if not is_first or is_first is not None:
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
            password=password_hasher.hash(rqt.form.get('password')),
            BDUSS=rqt.form.get('BDUSS'),
            STOKEN=rqt.form.get('STOKEN'),
        )
        await ForumUserPermission.create(
            fid=fid,
            fname=rqt.form.get('fname'),
            user=user,
            permission=Permission.Master,
        )
        await Config.set_config(key="first", v1=False)
        return response.json({"status": 200, "msg": "成功创建超级管理员"})
    except ArgException as err:
        return err_rps(err)


@app.get("/api/plugins")
@level_protected(Permission.MinAdmin)
async def get_plugins(rqt: Request):
    return json(data=list(plugins.keys()))


class PluginsStatus(HTTPMethodView):
    @level_protected(Permission.MinAdmin)
    async def get(self, rqt: Request):
        _plugin = rqt.args.get("plugin")
        if _plugin not in plugins.keys():
            return json("插件不存在", {"status": False})
        plugin_work: dict = rqt.app.m.workers.get(f"Sanic-{_plugin}-0")
        return json("插件状态", {"status": bool(plugin_work)})

    @level_protected(Permission.HighAdmin)
    async def post(self, rqt: Request):
        status = rqt.form.get("status")
        _plugin = rqt.form.get("plugin")
        if _plugin not in plugins.keys():
            return json("插件不存在", {"status": False})
        plugin_work = rqt.app.m.workers.get(f"Sanic-{_plugin}-0", None)
        if status == "1" and plugin_work:
            return json("插件已在运行", {"status": True})
        elif status == "1" and not plugin_work:
            rqt.app.m.manage(_plugin, plugins[_plugin].plugin.run,
                             {
                                 "db_url": rqt.app.ctx.DB_URL,
                                 "log_level": logger.level,
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


@app.get("/api/reviewer/keyword")
async def keyword_query(request):
    ...


@app.get("/api/reviewer/keyword/update", version=1)
async def keyword_update(request):
    ...


@app.get("/api/handler/switch", version=1)
async def handler_switch(request):
    ...


@app.get("/api/handler/info", version=1)
async def handle_query(request):
    ...


# @app.get('/')
# async def home(request):
#     return await response.file("./page/index.html")
#
#
# @app.get('/favicon.ico')
# async def favicon(request):
#     return await response.file('./page/logo.webp')
#
#
# @app.get('/assets/<file>')
# async def assets(request, file):
#     if file in app.ctx.assets:
#         mime = None
#         if splitext(file)[-1] == '.js':
#             mime = 'text/javascript'
#         return await response.file(f"./page/assets/{file}", mime_type=mime)
#     else:
#         return se_json("该页面不存在", {}, 404)


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=3100,
        dev=True,
    )
