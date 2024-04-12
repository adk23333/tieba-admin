import aiotieba
from sanic import Blueprint, Request, response, Sanic
from sanic_jwt import inject_user, protected, scoped

from core.exception import ArgException
from core.models import Permission, User, Config, ForumUserPermission
from core.utils import json, validate_password

bp_account = Blueprint("account", url_prefix="/api/auth")


@bp_account.get("/portrait")
@inject_user()
@protected()
@scoped(Permission.min(), False)
async def get_portrait(rqt: Request, user: User):
    """获取用于获取贴吧用户头像的portrait值

    """
    async with aiotieba.Client() as client:
        _user = await client.get_user_info(user.uid)
    return json(data=_user.portrait)


@bp_account.before_server_start
async def init_server(_app: Sanic):
    if (await Config.get_bool(key="first")) is None:
        await Config.set_config(key="first", v1=True)


@bp_account.on_request
async def first_login_check(rqt: Request):
    is_first = await Config.get_bool(key="first")
    if is_first and rqt.path != '/api/auth/first_login' and rqt.path.startswith("/api"):
        return response.json({"is_first": True}, 403)


@bp_account.post('/first_login')
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
        return json(err.message, status_code=err.status_code)


@bp_account.post("/change_pwd")
@inject_user()
@protected()
@scoped(Permission.ordinary(), False)
async def change_password(rqt: Request, user: User):
    """用于修改自己密码的接口


    """
    if not rqt.form.get("password"):
        raise ArgException

    validate_password(rqt.form.get("password"))
    user.password = rqt.app.shared_ctx.password_hasher.hash(rqt.form.get('password'))
    await user.save()
    return json("修改密码成功")
