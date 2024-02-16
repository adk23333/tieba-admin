import base64
from copy import deepcopy
from functools import wraps
from inspect import isawaitable

from sanic import Request, response, Blueprint, redirect
from sanic.views import HTTPMethodView
from sanic_jwt import Configuration, Responses, exceptions, utils
from sanic_jwt.decorators import instant_config
from sanic_jwt.exceptions import AuthenticationFailed

from .models import User, Permission, ForumUserPermission


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


async def _do_protection(level: Permission, need_user: bool, *args, **kwargs):
    initialized_on = kwargs.pop("initialized_on")
    kw = kwargs.pop("kw")
    request = kwargs.pop("request")
    f = kwargs.pop("f")

    use_kwargs = deepcopy(kwargs)
    if "return_response" in use_kwargs:
        use_kwargs.pop("return_response")

    if initialized_on and isinstance(initialized_on, Blueprint):
        instance = initialized_on
    else:
        instance = request.app

    with instant_config(instance, request=request, **kw):
        if request.method == "OPTIONS":
            response = f(request, *args, **use_kwargs)
            if isawaitable(response):  # noqa
                response = await response
            if kwargs.get("return_response", True):
                return response

            else:
                return True, response

        try:
            if instance.ctx.auth.config.do_protection():
                (
                    is_authenticated,
                    status,
                    reasons,
                ) = await instance.ctx.auth._check_authentication(
                    request, request_args=args, request_kwargs=use_kwargs
                )
            else:
                is_authenticated = True
                status = 200
                reasons = None
        except AttributeError:
            raise exceptions.SanicJWTException(
                "Authentication instance not found. Perhaps you used "
                "@protected without passing in a blueprint? "
                "Try @protected(blueprint)",
                status_code=500,
            )

        except exceptions.SanicJWTException as e:
            is_authenticated = False
            status = e.status_code
            reasons = (
                instance.ctx.auth._reasons
                if (
                        instance.ctx.auth._reasons
                        and instance.ctx.auth.config.debug()
                )
                else e.args[0]
            )

        if is_authenticated:
            if kwargs.get("return_response", True):
                payload = await instance.ctx.auth.extract_payload(
                    request, verify=False
                )
                user = await utils.call(
                    instance.ctx.auth.retrieve_user, request, payload
                )
                permission = await ForumUserPermission.filter(user=user).get()
                if permission.permission >= level.value:
                    if need_user:
                        response = f(request, user, *args, **use_kwargs)
                    else:
                        response = f(request, *args, **use_kwargs)
                else:
                    raise exceptions.AuthenticationFailed(
                        "您没有相关权限"
                    )

                if isawaitable(response):
                    response = await response
                return response

            else:
                return True, instance

        else:
            if kw.get("redirect_on_fail", False):
                where_to = kw.get(
                    "redirect_url",
                    instance.ctx.auth.config.login_redirect_url(),
                )

                if where_to is not None:
                    return redirect(where_to, status=302)

            raise exceptions.Unauthorized(reasons, status_code=status)


def level_protected(level: Permission = Permission.Ordinary, need_user=False, initialized_on=None, **kw):
    def decorator(f):
        @wraps(f)
        async def decorated_function(request, *args, **kwargs):
            if issubclass(request.__class__, HTTPMethodView):
                request = args[0]
            kwargs.update(
                {
                    "initialized_on": initialized_on,
                    "kw": kw,
                    "request": request,
                    "f": f,
                }
            )
            return await _do_protection(level, need_user, *args, **kwargs)

        return decorated_function

    return decorator
