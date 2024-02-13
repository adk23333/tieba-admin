import base64

from sanic import Request, response
from sanic_jwt import Configuration, Responses, exceptions
from sanic_jwt.exceptions import AuthenticationFailed

from core.models import User


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
