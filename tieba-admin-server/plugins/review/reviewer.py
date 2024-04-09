import asyncio
import random
from asyncio import sleep
from typing import Tuple, List

from aiotieba import Client, PostSortType, logging
from aiotieba.typing import Threads, Thread, Posts, Post, Comment
from sanic.log import logger
from tortoise import Tortoise, connections, ConfigurationError

from core.models import ForumUserPermission, User, Config, ExecuteType, Permission
from core.plugin import BasePlugin
from . import execute
from .checker import CheckMap, manager
from .models import Forum as RForum
from .models import Function as RFunction
from .models import Post as RPost
from .models import Thread as RThread


class Reviewer(BasePlugin):
    """
    继承自Plugin基类
    """
    PLUGIN_MODEL = "plugins.review.models"

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.check_map: CheckMap = manager.check_map
        self.client: Client = None
        self.FUP: ForumUserPermission = None
        self.no_exec = True
        self.check_name_map = manager.check_name_map

    async def check_threads(self, client: Client, fname: str):
        """
        检查主题贴的内容
        Args:
            client: 传入了执行账号的贴吧客户端
            fname: 贴吧名

        """
        threads: List[Tuple[Thread, bool]] = []
        origin_threads: Threads = await client.get_threads(fname)

        for thread in origin_threads:
            prev_thread = await RThread.filter(tid=thread.tid).get_or_none()
            if prev_thread:
                if thread.last_time < prev_thread.last_time:
                    await RThread.filter(tid=thread.tid).update(last_time=thread.last_time)
                elif thread.last_time > prev_thread.last_time:
                    threads.append((thread, True))
                    await RThread.filter(tid=thread.tid).update(last_time=thread.last_time)
            else:
                threads.append((thread, False))
                await RThread.create(tid=thread.tid, fid=await client.get_fid(fname), last_time=thread.last_time)

        need_check_post: List[Thread] = []
        for thread, checked in threads:
            executor = execute.Executor(client=client, obj=thread)
            if not checked:
                for check in self.check_map['thread']:
                    func_enable = await RFunction.get(function=check['function'].__name__)
                    if not func_enable.enable:
                        continue
                    _executor = await check['function'](thread, client)
                    if not _executor:
                        raise TypeError("Need to return Executor object")
                    executor.exec_compare(_executor)

            if executor.option != ExecuteType.ThreadDelete:
                need_check_post.append(thread)

            if not self.no_exec:
                await executor.run()

        for thread in need_check_post:
            await self.check_posts(client, thread.tid)

    async def check_posts(self, client: Client, tid: int):
        """
        检查楼层内容
        Args:
            client: 传入了执行账号的贴吧客户端
            tid: 所在主题贴id
        """
        posts: List[Tuple[Post, bool]] = []
        last_posts: Posts = await client.get_posts(tid, sort=PostSortType.DESC)
        for post in last_posts:
            prev_post = await RPost.filter(pid=post.pid).get_or_none()
            if prev_post:
                if post.reply_num < prev_post.reply_num:
                    await RPost.filter(pid=post.pid).update(reply_num=post.reply_num)
                elif post.reply_num > prev_post.reply_num:
                    posts.append((post, True))
                    await RPost.filter(pid=post.pid).update(reply_num=post.reply_num)
            else:
                posts.append((post, False))
                await RPost.create(pid=post.pid, tid=tid, reply_num=post.reply_num)

        need_check_comment: List[Post] = []
        for post, checked in posts:
            executor = execute.Executor(client=client, obj=post)
            if not checked:
                for check in self.check_map['post']:
                    func_enable = await RFunction.get(function=check['function'].__name__)
                    if not func_enable.enable:
                        continue
                    _executor = await check['function'](post, client)
                    if not _executor:
                        raise TypeError("Need to return Executor object")
                    executor.exec_compare(_executor)

            if executor.option != ExecuteType.PostDelete:
                need_check_comment.append(post)

            if not self.no_exec:
                await executor.run()

        for post in need_check_comment:
            await self.check_comment(client, post.pid, post.tid)

    async def check_comment(self, client: Client, pid: int, tid: int):
        """
        检查楼中楼内容
        Args:
            client: 传入了执行账号的贴吧客户端
            pid: 楼层id
            tid: 主题贴id
        """
        comments: List[Comment] = []
        count = 1
        while origin_comments := await client.get_comments(tid, pid, pn=count):
            for comment in origin_comments:
                prev_comment = await RPost.filter(pid=comment.pid).get_or_none()
                if not prev_comment:
                    comments.append(comment)
                    await RPost.create(pid=comment.pid, tid=comment.tid, ppid=pid)
            count += 1

        for comment in comments:
            executor = execute.Executor(client=client, obj=comment)
            for check in self.check_map['comment']:
                func_enable = await RFunction.get(function=check['function'].__name__)
                if not func_enable.enable:
                    continue
                _executor = await check['function'](comment, client)
                if not _executor:
                    raise TypeError("Need to return Executor object")
                executor.exec_compare(_executor)

            if not self.no_exec:
                await executor.run()

    async def run_with_client(self, client: Client, min_time=10.0, max_time=20.0):
        """
        实现持续监控的关键函数
        Args:
            client: 传入了执行账号的贴吧客户端
            min_time: 最短间隔时间（单位：秒）
            max_time: 最大间隔时间（单位：秒）
        """
        while True:
            logger.debug(f"[Reviewer] review {self.FUP.fname}")
            rst = await RForum.get(fname=self.FUP.fname)
            if rst.enable:
                await self.check_threads(client, self.FUP.fname)
            if self.no_exec:
                break
            await sleep(random.uniform(min_time, max_time))

    async def get_fup(self):
        self.FUP = await ForumUserPermission.filter(permission=Permission.Master.value).get_or_none()
        if self.FUP:
            rf = await RForum.filter(fname=self.FUP.fname).get_or_none()
            if not rf:
                await RForum.create(fname=self.FUP.fname)

    @classmethod
    async def init_plugin(cls):
        logging.set_logger(logger)

        no_exec = await Config.get_bool(key="REVIEW_NO_EXEC")
        if no_exec is None:
            await Config.set_config(key="REVIEW_NO_EXEC", v1=True)

        await RFunction.filter(function__not_in=manager.check_name_map).delete()
        old_name_map: List[str] = [i.function for i in (await RFunction.all())]
        func_list = []

        for c in manager.check_name_map:
            if c not in old_name_map:
                func_list.append(RFunction(function=c))
        await RFunction.bulk_create(func_list)

    async def on_start(self):
        logging.set_logger(logger)
        await Tortoise.init(db_url=self.kwargs["db_url"],
                            modules={"models": self.kwargs["models"]})

        self.no_exec = await Config.get_bool(key="REVIEW_NO_EXEC")
        await self.get_fup()

    async def on_running(self):
        user: User = await self.FUP.user
        self.client = await Client(user.BDUSS, user.STOKEN).__aenter__()
        await asyncio.gather(*[self.run_with_client(self.client)])

    async def on_stop(self):
        try:
            await connections.close_all()
            await self.client.__aexit__()
        except ConfigurationError:
            pass
        except AttributeError:
            pass
