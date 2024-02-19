from dataclasses import dataclass
from enum import IntEnum
from typing import Union, Literal

from aiotieba import Client
from aiotieba.typing import Comment as Tb_Comment
from aiotieba.typing import Post as Tb_Post
from aiotieba.typing import Thread as Tb_Thread
from sanic.log import logger


class OptionType(IntEnum):
    Empty = 0  # 无操作


class User(IntEnum):
    Block = 1  # 封禁
    Black = 2  # 拉黑


class Thread(IntEnum):
    """
    对主题贴操作
    """
    Hide = 3  # 隐藏
    Delete = 4  # 删除


class Post(IntEnum):
    """
    对楼层操作
    """
    Delete = 5  # 删除


class Comment(IntEnum):
    """
    对楼中楼操作
    """
    Delete = 6  # 删除


UnitOptionType = Union[OptionType, Thread, Post, Comment]


@dataclass
class Executor(object):
    """操作容器类

    所有操作都应该使用此类包装后统一处理.

    Args:
        client: 传入了执行账号的贴吧客户端.
        obj: 待处理的贴子.
        user_opt: 对待处理贴子的发送者的处理.
        option: 对贴子的处理.
        user_day: 对发送者的操作持续时间.
        opt_day: 对贴子的操作持续时间.
    """
    client: Client = None
    obj: Union[Tb_Thread, Tb_Post, Tb_Comment, None] = None
    user_opt: Union[User, OptionType] = OptionType.Empty
    option: UnitOptionType = OptionType.Empty
    user_day: int = 0
    opt_day: int = 0

    async def run(self):
        """
        执行操作
        Returns:
            None

        """
        rst = True
        match self.user_opt:
            case OptionType.Empty:
                pass
            case User.Block:
                rst = await self.client.block(self.obj.fid, self.obj.user.portrait, day=self.user_day)
            case User.Black:
                rst = await self.client.add_bawu_blacklist(self.obj.fname, self.obj.user.portrait)
        if not rst:
            logger.warning(rst.err.__str__())
        rst = True
        match self.option:
            case OptionType.Empty:
                pass
            case Thread.Hide:
                rst = await self.client.hide_thread(self.obj.fid, self.obj.tid)
            case Thread.Delete:
                rst = await self.client.del_thread(self.obj.fid, self.obj.tid)
            case Post.Delete:
                rst = await self.client.del_post(self.obj.fid, self.obj.tid, self.obj.pid)
            case Comment.Delete:
                rst = await self.client.del_post(self.obj.fid, self.obj.tid, self.obj.pid)
        if not rst:
            logger.warning(rst.err.__str__())

    def exec_compare(self, exec2):
        """
        与exec2比较处罚严重程度，返回包含更严重操作的新操作类
        Args:
            exec2 (Executor): 待比较操作类

        Returns:
            Executor

        """

        if exec2.user_opt > self.user_opt:
            self.user_opt = exec2.user_opt
            self.user_day = exec2.user_day
        elif exec2.user_opt == self.user_opt and exec2.user_day > self.user_day:
            self.user_day = exec2.user_day

        if exec2.option > self.option:
            self.option = exec2.option
        elif exec2.option == self.option and exec2.opt_day > self.opt_day:
            self.opt_day = exec2.opt_day


def empty():
    """
    返回空操作
    Returns:
        Executor
    """
    return Executor()


def hide(client: Client, thread: Tb_Thread, day: int = 1):
    """
    返回屏蔽主题贴的操作
    Args:
        client: 传入了执行账号的贴吧客户端
        thread: 待处理主题贴
        day: 屏蔽持续时间（单位：天）

    Returns:
        Executor
    """
    return Executor(
        client,
        thread,
        option=Thread.Hide,
        opt_day=day,
    )


def delete(client: Client, obj: Union[Tb_Thread, Tb_Post, Tb_Comment], day: Literal[-1, 0, 1, 3, 10] = 0):
    """
    返回删除主题贴的操作
    Args:
        client: 传入了执行账号的贴吧客户端
        obj: 待处理的主题贴/楼/楼中楼
        day: 对发送者的封禁持续时间（单位：天）-1是永封

    Returns:
        Executor
    """
    if isinstance(obj, Tb_Thread):
        option = Thread.Delete
    elif isinstance(obj, Tb_Post):
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
    """
    返回封禁操作
    Args:
        client: 传入了执行账号的贴吧客户端
        obj: 待处理的主题贴/楼/楼中楼
        day: 封禁时间（单位：天）

    Returns:
        Executor
    """
    return Executor(
        client,
        obj,
        user_opt=User.Block,
        user_day=day
    )


def black(client: Client, obj: Union[Tb_Thread, Tb_Post, Tb_Comment]):
    """
    返回加入黑名单操作
    Args:
        client: 传入了执行账号的贴吧客户端
        obj: 待处理的主题贴/楼/楼中楼

    Returns:
        Executor
    """
    return Executor(
        client,
        obj,
        user_opt=User.Black,
    )
