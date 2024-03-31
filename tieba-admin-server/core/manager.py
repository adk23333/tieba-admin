from sanic import Blueprint, Request
from sanic.views import HTTPMethodView
from sanic_jwt import protected, scoped

from .models import ForumUserPermission, Permission
from .utils import json

manager = Blueprint("manager")


class UserPermission(HTTPMethodView):
    @protected()
    @scoped(Permission.min(), False)
    async def get(self, rqt: Request):
        _permission = await ForumUserPermission.all()
        permission = []
        for p in _permission:
            permission.append(await p.to_dict())
        return json(data=permission)

    @protected()
    @scoped(Permission.super(), False)
    async def post(self, rqt: Request):
        if not rqt.form.get("uid") or not rqt.form.get("fid") or not rqt.form.get("pm"):
            return json("参数错误")
        if rqt.form.get("pm") not in [i.value for i in Permission]:
            return json("参数错误")

        permission = await ForumUserPermission.filter(user_id=rqt.form.get("uid"),
                                                      fid=rqt.form.get("fid")).get_or_none()
        if not permission:
            return json("没有该成员")

        if permission.permission == Permission.Master.value or rqt.form.get("pm") == Permission.Master.value:
            return json("您没有相关权限")

        permission.permission = rqt.form.get("pm")

        return json(data=await permission.to_dict())


manager.add_route(UserPermission.as_view(), "/api/manager/user_pm")
