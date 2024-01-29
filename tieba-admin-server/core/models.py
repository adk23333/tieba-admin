from datetime import datetime
from enum import IntEnum, unique

from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
from sanic_jwt.exceptions import AuthenticationFailed
from tortoise import Model, fields
from tortoise.exceptions import DoesNotExist

password_hasher = PasswordHasher()


@unique
class Permission(IntEnum):
    TopAdmin = 5
    Admin = 4
    TopOperator = 3
    Operator = 2
    Creator = 1
    Ordinary = 0
    Hide = -1001
    Block = -2001
    Black = -3


class Config(Model):
    key = fields.CharField(max_length=32)
    v1 = fields.CharField(max_length=256)

    class Meta:
        table = "configs"


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
