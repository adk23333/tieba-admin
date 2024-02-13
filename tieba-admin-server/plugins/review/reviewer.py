import asyncio
import random
from asyncio import sleep
from enum import Enum
from typing import Tuple, Callable, Dict, Literal, List, Union, Coroutine, Any

from aiotieba import Client, PostSortType, logging
from aiotieba.typing import Threads, Thread, Posts, Post, Comment
from sanic.log import logger
from tortoise import Tortoise

from core.models import ForumUserPermission, Permission, User, Config
from core.plugin import Plugin
from . import execute
from .models import Forum as RForum
from .models import Function as RFunction
from .models import Post as RPost
from .models import Thread as RThread

CheckFunc = Callable[[Union[Thread, Post, Comment], Client], Coroutine[Any, Any, execute.Executor]]
Check = Dict[Literal['function', 'kwargs'], Union[CheckFunc, Dict]]
CheckMap = Dict[Literal['post', 'comment', 'thread'], List[Check]]


class Level(Enum):
    ALL = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18}
    LOW = {1, 2, 3}
    MIDDLE = {4, 5, 6, 7, 8, 9}
    HIGH = {10, 11, 12, 13, 14, 15, 16, 17, 18}
    LOW1 = {1, 2, 3, 4, 5, 6}
    MIDDLE2 = {7, 8, 9, 10, 11, 12}
    HIGH2 = {13, 14, 15, 16, 17, 18}

    def __add__(self, other):
        return self.value.add(other)


class Reviewer(Plugin):
    def __init__(self):
        self.check_map: CheckMap = {'comment': [], 'post': [], 'thread': []}
        self.clients: Dict[Client, List[str]] = {}
        self.no_exec = True
        self.check_name_map = set()

    async def init_config(self):
        logging.set_logger(logger)
        self.no_exec = await Config.get_bool(key="REVIEW_NO_EXEC")
        if self.no_exec is None:
            await Config.set_config(key="REVIEW_NO_EXEC", v1=True)
            self.no_exec = True

        temp = await ForumUserPermission.filter(permission__gte=Permission.HighAdmin.value).all()
        fnames = [t.fname for t in temp]
        await RFunction.filter(function__not_in=self.check_name_map).delete()
        old_name_map: List[str] = [i.function for i in (await RFunction.all())]
        func_list = []
        for fname in fnames:
            for name in self.check_name_map:
                if name not in old_name_map:
                    func_list.append(RFunction(function=name, fname_id=fname))
        await RFunction.bulk_create(func_list)

        return temp

    def __del__(self):
        for client in self.clients.keys():
            client.__aexit__()

    def comment(self, description: str = None):
        def wrapper(func: CheckFunc):
            self.check_name_map.add(func.__name__)
            self.check_map['comment'].append({
                'function': func,
                'kwargs': {
                    'description': description,
                },
            })
            return func

        return wrapper

    def post(self, description: str = None):
        def wrapper(func: CheckFunc):
            self.check_name_map.add(func.__name__)
            self.check_map['post'].append({
                'function': func,
                'kwargs': {
                    'description': description,
                },
            })
            return func

        return wrapper

    def thread(self, description: str = None):
        def wrapper(func: CheckFunc):
            self.check_name_map.add(func.__name__)
            self.check_map['thread'].append({
                'function': func,
                'kwargs': {
                    'description': description,
                },
            })
            return func

        return wrapper

    def route(self,
              _type: List[Literal['thread', 'post', 'comment']],
              description: str = None):
        def wrapper(func: CheckFunc):
            self.check_name_map.add(func.__name__)
            for __type in _type:
                if not (__type == 'thread' or __type == 'post' or __type == 'comment'):
                    raise TypeError
                self.check_map[__type].append({
                    'function': func,
                    'kwargs': {
                        'description': description,
                    },
                })
            return func

        return wrapper

    async def check_threads(self, client: Client, fname: str):
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
                    func_enable = await RFunction.get(fname=fname, function=check['function'].__name__)
                    if not func_enable.enable:
                        continue
                    _executor = await check['function'](thread, client)
                    if not _executor:
                        raise TypeError("Need to return Executor object")
                    executor.exec_compare(_executor)

            if executor.option != execute.Thread.Delete:
                need_check_post.append(thread)

            if not self.no_exec:
                await executor.run()

        for thread in need_check_post:
            await self.check_posts(client, thread.tid)

    async def check_posts(self, client: Client, tid: int):
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
                    func_enable = await RFunction.get(fname=post.fname, function=check['function'].__name__)
                    if not func_enable.enable:
                        continue
                    _executor = await check['function'](post, client)
                    if not _executor:
                        raise TypeError("Need to return Executor object")
                    executor.exec_compare(_executor)

            if executor.option != execute.Post.Delete:
                need_check_comment.append(post)

            if not self.no_exec:
                await executor.run()

        for post in need_check_comment:
            await self.check_comment(client, post.pid, post.tid)

    async def check_comment(self, client: Client, pid: int, tid: int):
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
                func_enable = await RFunction.get(fname=comment.fname, function=check['function'].__name__)
                if not func_enable.enable:
                    continue
                _executor = await check['function'](comment, client)
                if not _executor:
                    raise TypeError("Need to return Executor object")
                executor.exec_compare(_executor)

            if not self.no_exec:
                await executor.run()

    async def run_with_client(self, client: Client, min_time=10.0, max_time=20.0):
        while True:
            for fname in self.clients[client]:
                logger.debug(f"[Reviewer] review {fname}")
                rst = await RForum.get(fname=fname)
                if rst.enable:
                    await self.check_threads(client, fname)
                await sleep(random.uniform(min_time, max_time))

    async def async_run(self, review_models="plugins.review.models", **kwargs):
        await Tortoise.init(db_url=kwargs["db_url"],
                            modules={"models": ["core.models", review_models]})
        await Tortoise.generate_schemas()

        temp = await self.init_config()
        user_with_fname: List[Tuple[User, str]] = [(await t.user.get(), t.fname) for t in temp]
        for i in user_with_fname:
            client = await Client(i[0].BDUSS, i[0].STOKEN).__aenter__()
            try:
                self.clients[client].append(i[1])
            except KeyError:
                self.clients[client] = []
                self.clients[client].append(i[1])

        await asyncio.gather(*[self.run_with_client(client) for client in self.clients])

    def run(self, **kwargs):
        try:
            logger.setLevel(kwargs["log_level"])
            logger.info("[Reviewer] running.")
            asyncio.run(self.async_run(db_url=kwargs["db_url"]))
        except KeyboardInterrupt:
            pass
