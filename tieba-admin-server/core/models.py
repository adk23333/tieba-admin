import json
from datetime import datetime
from enum import IntEnum, unique
from typing import Any, Optional

from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from sanic_jwt.exceptions import AuthenticationFailed
from tortoise import Model, fields
from tortoise.exceptions import DoesNotExist

password_hasher = PasswordHasher()


@unique
class Permission(IntEnum):
    Master = 5
    SuperAdmin = 4
    HighAdmin = 3
    MinAdmin = 2
    Creator = 1
    Ordinary = 0
    Black = -10000


class Config(Model):
    key = fields.CharField(max_length=32)
    v1 = fields.CharField(max_length=256)

    class Meta:
        table = "configs"

    @staticmethod
    async def get_bool(key: str) -> bool:
        rst = await Config.filter(key=key).get_or_none()
        if rst:
            return rst.v1 == str(True)

    @staticmethod
    async def get_list(key: str) -> Optional[bool]:
        rst = await Config.filter(key=key).get_or_none()
        if rst:
            return json.loads(rst.v1)

    @staticmethod
    async def set_config(key: str, v1: Any):
        rst = await Config.filter(key=key).get_or_none()
        if not rst:
            rst = Config(key=key, v1=str(v1))
        await rst.save()


class User(Model):
    uid = fields.BigIntField(pk=True)
    tuid = fields.BigIntField(null=True, default=None)
    username = fields.CharField(max_length=64)
    password = fields.CharField(max_length=128)
    BDUSS = fields.CharField(max_length=200, null=True, default='')
    STOKEN = fields.CharField(max_length=80, null=True, default='')
    master = fields.BigIntField(null=True, default=None)
    date_created: datetime = fields.DatetimeField(auto_now_add=True)
    date_updated: datetime = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "users"

    @staticmethod
    async def get_via_uid(tuid: int):
        try:
            user = await User.filter(tuid=tuid).get()
            return user
        except DoesNotExist:
            raise AuthenticationFailed("用户名或密码不正确")

    async def verify_password(self, password: str):
        try:
            password_hasher.verify(self.password, password)
            if password_hasher.check_needs_rehash(self.password):
                self.password = password_hasher.hash(password)
                await self.save(update_fields=["password"])
        except VerifyMismatchError:
            raise AuthenticationFailed("用户名或密码不正确")

    def to_dict(self):
        return {
            "uid": self.uid,
            "tuid": self.tuid,
            "username": self.username,
            "date_created": str(self.date_created),
            "date_updated": str(self.date_updated),
        }


class ForumUserPermission(Model):
    fid = fields.IntField()
    fname = fields.CharField(max_length=128)
    user = fields.ForeignKeyField("models.User")
    permission = fields.IntField(default=Permission.Ordinary.value)
    date_created: datetime = fields.DatetimeField(auto_now_add=True)
    date_updated: datetime = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "forum_user_permission"

    def to_dict(self):
        return {
            "fid": self.fid,
            "fname": self.fname,
            "uid": self.user,
            "permission": self.permission,
        }
