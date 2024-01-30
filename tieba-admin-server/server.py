import base64
import logging

import aiotieba
from sanic import Sanic, Request, response
from sanic.log import LOGGING_CONFIG_DEFAULTS
from sanic_ext import Extend
from sanic_jwt import Initialize, Configuration, Responses, exceptions
from sanic_jwt.exceptions import AuthenticationFailed
from tortoise.contrib.sanic import register_tortoise

from core.exception import ArgException, err_rps
from core.models import User, Config, password_hasher, Permission, ForumUserPermission
from core.utils import validate_password

current_level = logging.getLevelName(logging.getLogger().getEffectiveLevel())
LOGGING_CONFIG = LOGGING_CONFIG_DEFAULTS
if current_level == "DEBUG":
    LOGGING_CONFIG.update({
        "handlers": {
            "console": {
                "class": "logging.FileHandler",
                "formatter": "generic",
                "filename": "./log/server.log",
                'encoding': "utf-8"
            },
            "error_console": {
                "class": "logging.FileHandler",
                "formatter": "generic",
                "filename": "./log/server.log",
                'encoding': "utf-8",
            },
            "access_console": {
                "class": "logging.FileHandler",
                "formatter": "access",
                "filename": "./log/server.log",
                'encoding': "utf-8",
            },
        },

    })


async def authenticate(rqt: Request):
    if rqt.headers.get("Authorization"):
        try:
            authorization_type, credentials = rqt.headers.get("Authorization").split()
        except ValueError:
            raise AuthenticationFailed("请先登录账号")
        if authorization_type == "Basic":
            uid, password = (
                base64.b64decode(credentials).decode().split(":")
            )
        else:
            raise AuthenticationFailed("错误的凭证")
    else:
        raise AuthenticationFailed("请先登录账号")
    try:
        user = await User.get_via_uid(int(uid))
        await user.verify_password(password)
        return user
    except ValueError:
        raise AuthenticationFailed("请使用uid登录")


async def retrieve_user(rqt: Request, payload):
    try:
        uid = payload.get('uid', None)
        user = await User.filter(uid=uid).get()
        return user
    except Exception:
        raise


class JwtConfig(Configuration):
    url_prefix = "/api/auth"
    path_to_retrieve_user = "/self"
    secret = "asdfghjkl"
    expiration_delta = 60 * 60
    # cookie_set = True
    # cookie_access_token_name = "token"
    user_id = "uid"


class JwtResponse(Responses):
    @staticmethod
    def exception_response(rqt: Request, exception: exceptions):
        msg = str(exception)
        if exception.status_code == 500:
            msg = str(exception)
        elif isinstance(exception, exceptions.AuthenticationFailed):
            msg = str(exception)
        else:
            if "expired" in msg:
                msg = "授权已失效，请重新登录！"
            else:
                msg = "未授权，请先登录！"
        result = {
            "status": exception.status_code,
            "data": None,
            "msg": msg
        }
        return response.json(result, status=exception.status_code)


app = Sanic("tieba-admin-server", log_config=LOGGING_CONFIG)
Extend(app)
register_tortoise(app, db_url="sqlite://.cache/db.sqlite",
                  modules={'models': ['core.models']},
                  generate_schemas=True)
Initialize(app, authenticate=authenticate,
           retrieve_user=retrieve_user,
           configuration_class=JwtConfig,
           responses_class=JwtResponse)


@app.before_server_start
async def init_server(_app):
    if not await Config.get_bool(key="first"):
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

        async with aiotieba.Client() as client:
            client.account.BDUSS = rqt.form.get('BDUSS')
            client.account.STOKEN = rqt.form.get('STOKEN')
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
            permission=Permission.TopAdmin,
        )
        await Config.set_config(key="first", v1=False)
        return response.json({"status": 200, "msg": "成功创建超级管理员"})
    except ArgException as err:
        return err_rps(err)


@app.get("/api/reviewer/switch")
async def reviewer_switch(request):
    ...


@app.get("/api/reviewer/info")
async def reviewer_query(request):
    ...


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
