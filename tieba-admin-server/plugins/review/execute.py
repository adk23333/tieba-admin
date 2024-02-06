from dataclasses import dataclass
from enum import Enum
from typing import Union, Literal

from aiotieba import Client
from aiotieba.typing import Comment as Tb_Comment
from aiotieba.typing import Post as Tb_Post
from aiotieba.typing import Thread as Tb_Thread


class OptionType(Enum):
    Empty = 0


class User(Enum):
    Block = 1
    Black = 2


class Thread(Enum):
    Hide = 3
    Delete = 4


class Post(Enum):
    Delete = 5


class Comment(Enum):
    Delete = 6


UnitOptionType = Union[OptionType, Thread, Post, Comment]


@dataclass
class Executor(object):
    client: Client = None
    obj: Union[Tb_Thread, Tb_Post, Tb_Comment, None] = None
    user_opt: Union[User, OptionType] = OptionType.Empty
    option: UnitOptionType = OptionType.Empty
    user_day: int = 0
    opt_day: int = 0

    async def run(self):
        match self.user_opt:
            case OptionType.Empty:
                pass
            case User.Block:
                await self.client.block(self.obj.fid, self.obj.user.portrait, day=self.user_day)
            case User.Black:
                pass
                # TODO 确定黑名单是无限循环封禁还是使用官方黑名单
        match self.option:
            case OptionType.Empty:
                pass
            case Thread.Hide:
                await self.client.hide_thread(self.obj.fid, self.obj.tid)
            case Thread.Delete:
                await self.client.del_thread(self.obj.fid, self.obj.tid)
            case Post.Delete:
                await self.client.del_post(self.obj.fid, self.obj.tid, self.obj.pid)
            case Comment.Delete:
                await self.client.del_post(self.obj.fid, self.obj.tid, self.obj.pid)

    def exec_compare(self, exec2):
        if exec2.user_opt.value > self.user_opt.value:
            self.user_opt = exec2.user_opt
            self.user_day = exec2.user_day
        elif exec2.user_opt == self.user_opt and exec2.user_day > self.user_day:
            self.user_day = exec2.user_day

        if exec2.option.value > self.option.value:
            self.option = exec2.option
        elif exec2.option == self.option and exec2.opt_day > self.opt_day:
            self.opt_day = exec2.opt_day


def empty():
    return Executor()


def hide(client: Client, thread: Thread, day: int = 1):
    return Executor(
        client,
        thread,
        option=Thread.Hide,
        opt_day=day,
    )


def delete(client: Client, obj: Union[Tb_Thread, Tb_Post, Tb_Comment], day: Literal[-1, 0, 1, 3, 10] = 0):
    if isinstance(obj, Tb_Thread):
        option = Thread.Delete
    elif isinstance(obj, Post):
        option = Post.Delete
    elif isinstance(obj, Tb_Comment):
        option = Comment.Delete
    else:
        option = OptionType.Empty

    if day:
        if day == -1:
            user_opt = User.Black
        else:
            user_opt = User.Block
        return Executor(
            client,
            obj,
            option=option,
            user_opt=user_opt,
            user_day=day,
        )
    else:
        return Executor(
            client,
            obj,
            option=option,
        )


def block(client: Client, obj: Union[Tb_Thread, Tb_Post, Tb_Comment], day: Literal[1, 3, 10] = 1):
    return Executor(
        client,
        obj,
        user_opt=User.Block,
        user_day=day
    )


def black(client: Client, obj: Union[Tb_Thread, Tb_Post, Tb_Comment]):
    return Executor(
        client,
        obj,
        user_opt=User.Black,
    )
