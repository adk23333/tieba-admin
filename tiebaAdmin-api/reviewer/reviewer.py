import argparse
import asyncio
import re
from threading import Event
from threading import Thread as pyThread
from typing import List, Optional, Tuple

import aiotieba as tb
import aiotieba_reviewer as tbr
import tomli
from aiotieba.api.get_threads import Thread
from aiotieba.api.profile import Thread_pf, UserInfo_pf
from aiotieba.typing import Comment, Post
from aiotieba_reviewer import Ops, Punish, TypeObj
from cacheout import Cache

sign_check_exp = re.compile(r'企鹅|扣扣', re.I)
KEY_WORD = []

LOW_USER_LEVEL = [1, 2, 3]
MIDDLE_USER_LEVEL = [4, 5, 6, 7, 8, 9]
HIGH_USER_LEVEL = [10, 11, 12, 13, 14, 15, 16, 17, 18]


@Cache(maxsize=64).memoize()
async def get_homepage(client: tb.Client, user_id: int) -> Tuple[UserInfo_pf, List[Thread_pf]]:
    return await client.get_homepage(user_id)


# 使用装饰器将以下函数设置为针对主题帖的checker
@tbr.reviewer.thread.set_checker()
async def check_thread(thread: Thread) -> Optional[Punish]:
    punish = await check_low_user_text(thread)
    if punish:
        return punish

    user = thread.user
    if user.level not in LOW_USER_LEVEL or user.priv_like == 3:
        return
    client = await tbr.get_client()
    hpuser, hpthreads = await get_homepage(client, user.user_id)

    # 用户个性签名是否包含违规内容
    if sign_check_exp.search(hpuser.sign):
        return Punish(thread, Ops.DELETE, 10, note="麦片sig")


# 使用装饰器将以下函数设置为针对回复楼层的checker
@tbr.reviewer.post.set_checker()
async def check_post(post: Post) -> Optional[Punish]:
    punish = await check_post_1(post)
    if punish:
        return punish
    punish = await check_low_user_text(post)
    if punish:
        return punish


async def check_post_1(post: Post) -> Optional[Punish]:
    text = post.contents.text
    if text.count('\n') > 132:
        # 闪光弹
        return Punish(post, Ops.DELETE, 3, note="闪光弹")


# 使用装饰器将以下函数设置为针对楼中楼的checker
@tbr.reviewer.comment.set_checker()
async def check_comment(comment: Comment) -> Optional[Punish]:
    punish = await check_low_user_text(comment)
    if punish:
        return punish


async def check_low_user_text(obj: TypeObj) -> Optional[Punish]:
    if obj.user.level not in LOW_USER_LEVEL:
        return
    for i in KEY_WORD:
        if i in obj.text:
            return Punish(obj, Ops.DELETE, note="适用于3级以下用户的违规词汇")


class ReviewerThread(pyThread):
    TimeInterval = 0.0
    Order = 0
    Task = None
    REVIEWER_CONFIG = []

    def __init__(self, is_test: bool, keyword):
        super(ReviewerThread, self).__init__()
        self._stop_event = Event()
        self.isTest = is_test
        global KEY_WORD
        KEY_WORD = keyword
        self.REVIEWER_CONFIG = self.get_config()

    @staticmethod
    def get_config():
        with open('setting.toml', 'rb') as file:
            return tomli.load(file)

    def run(self):
        asyncio.run(self.__run())

    async def __run(self):
        self.Task = asyncio.create_task(self.reviewer())
        await self.Task

    async def reviewer(self):
        tbr.set_BDUSS_key(self.REVIEWER_CONFIG['Reviewer']['BDUSS_key'])
        tbr.set_fname(self.REVIEWER_CONFIG['Reviewer']['fname'])

        try:
            if not self.isTest:
                async with tbr.no_test():
                    await tbr.run(10.0)
            else:
                await tbr.run(20.0)
        except asyncio.CancelledError:
            pass

    def stop(self):
        self.Task.cancel()
        self._stop_event.set()

    def stopped(self):
        return self._stop_event.is_set()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--no_test",
        help="测试模式默认开启以避免误操作 生产环境下使用该选项将其关闭",
        action="store_true",
    )
    args = parser.parse_args()

    config = ReviewerThread.get_config()


    async def main():
        tbr.set_BDUSS_key(config['Reviewer']['BDUSS_key'])
        tbr.set_fname(config['Reviewer']['fname'])
        global KEY_WORD
        KEY_WORD = ["abcd"]
        if args.no_test:
            async with tbr.no_test():
                await tbr.run()
        else:
            await tbr.run(35.0)


    asyncio.run(main())
