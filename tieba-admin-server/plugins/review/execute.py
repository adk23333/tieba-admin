from dataclasses import dataclass
from enum import Enum
from typing import Union

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


UnitOptionType = Union[OptionType, User, Thread, Post, Comment]

@dataclass
class Executor(object):
    obj: Union[Tb_Thread, Tb_Post, Tb_Comment, None] = None
    user_opt: Union[User, OptionType] = OptionType.Empty
    option: UnitOptionType = OptionType.Empty
    user_day: int = 0
    opt_day: int = 0

    async def run(self):
        ...

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


def hide(thread: Thread, day: int = 1):
    return Executor(
        thread,
        option=Thread.Hide,
        opt_day=day,
    )


def delete(obj: Union[Tb_Thread, Tb_Post, Tb_Comment], day: int = 0):
    if isinstance(obj, Tb_Thread):
        option = Thread.Delete
    elif isinstance(obj, Post):
        option = Post.Delete
    elif isinstance(obj, Tb_Comment):
        option = Comment.Delete
    else:
        option = OptionType.Empty

    if day:
        return Executor(
            obj,
            option=option,
            user_opt=User.Block,
            user_day=day,
        )
    else:
        return Executor(
            obj,
            option=option,
        )


def block(obj: Union[Tb_Thread, Tb_Post, Tb_Comment], day: int = 1):
    return Executor(
        obj,
        user_opt=User.Block,
        user_day=day
    )


def black(obj: Union[Tb_Thread, Tb_Post, Tb_Comment]):
    return Executor(
        obj,
        user_opt=User.Black,
    )
