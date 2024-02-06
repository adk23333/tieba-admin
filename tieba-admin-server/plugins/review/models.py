from datetime import datetime

from tortoise import Model, fields


class Thread(Model):
    tid = fields.BigIntField(pk=True)
    fid = fields.BigIntField()
    last_time = fields.BigIntField()
    date_created: datetime = fields.DatetimeField(auto_now_add=True)
    date_updated: datetime = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "review_thread"


class Post(Model):
    pid = fields.BigIntField(pk=True)
    tid = fields.BigIntField()
    ppid = fields.BigIntField(null=True, default=None)
    reply_num = fields.IntField(null=True, default=None)
    date_created: datetime = fields.DatetimeField(auto_now_add=True)
    date_updated: datetime = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "review_post"


class Forum(Model):
    fname = fields.CharField(max_length=60, pk=True)
    enable = fields.BooleanField(default=False)
    date_created: datetime = fields.DatetimeField(auto_now_add=True)
    date_updated: datetime = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "review_forum"


class Function(Model):
    function = fields.CharField(max_length=64, pk=True)
    fname = fields.ForeignKeyField("models.Forum", related_name="forum_fname")
    enable = fields.BooleanField(default=False)
    date_created: datetime = fields.DatetimeField(auto_now_add=True)
    date_updated: datetime = fields.DatetimeField(auto_now=True)

    class Meta:
        table = "review_function"
