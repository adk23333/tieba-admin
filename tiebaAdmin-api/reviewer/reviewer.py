import argparse
import asyncio
import re
from threading import Thread, Event
from typing import List, Optional, Tuple

import aiotieba as tb
import aiotieba_reviewer as tbr
import tomli
from aiotieba.api.get_homepage import Thread_home, UserInfo_home
from aiotieba.api.get_posts import UserInfo_pt
from aiotieba.typing import Comment, Post
from aiotieba_reviewer import Ops, Punish, TypeObj, imgproc
from cacheout import Cache

sign_check_exp = re.compile(r'企鹅|扣扣', re.I)
KEY_WORD = ""

# pip install cacheout
# 为高开销函数创建缓存
# @Cache(maxsize=256).memoize()
async def portrait_hasQR(client: tb.Client, portrait: str) -> bool:
    pimg = await client.get_portrait(portrait, 'l')
    if pimg.size and imgproc.has_QRcode(pimg):
        return True
    return False


# 同理 缓存返回的结果
@Cache(maxsize=64).memoize()
async def get_homepage(client: tb.Client, portrait: str) -> Tuple[UserInfo_home, List[Thread_home]]:
    return await client.get_homepage(portrait, with_threads=True)


# 使用装饰器将以下函数设置为针对主题帖的checker
@tbr.reviewer.thread.set_checker()
async def check_thread(thread: Thread) -> Optional[Punish]:
    # 水经验
    # if thread.is_help:
    #     if re.search(r'氵|\+3|➕3|加三|加3|经验|jy', thread.text):
    #         return Punish(thread, Ops.DELETE, 1, note="单开水楼")

    user: UserInfo_pt = thread.user

    # 作图广告
    for at in thread.contents.ats:
        if at.user_id == 4928198503:
            if user.level == 1:
                return Punish(thread, Ops.DELETE, 10, note="作图广告")
            else:
                return Punish(thread, Ops.DELETE, note="作图广告")

    client = await tbr.get_client()

    # 老用户提早返回 跳过后续检查
    if user.level >= 4 or user.glevel >= 4 or user.priv_like == 3:
        return

    hpuser, hpthreads = await get_homepage(client, user.portrait)

    # 用户个性签名是否包含违规内容
    if sign_check_exp.search(hpuser.sign):
        return Punish(thread, Ops.DELETE, 10, note="麦片sig")

    # 头像是否包含二维码
    if await portrait_hasQR(client, user.portrait):
        return Punish(thread, Ops.DELETE, 10, note="头像广告")


# 使用装饰器将以下函数设置为针对回复楼层的checker
@tbr.reviewer.post.set_checker()
async def check_post(post: Post) -> Optional[Punish]:
    punish = await _check_post(post)
    if punish:
        return punish
    punish = await check_text(post)
    if punish:
        return punish


async def _check_post(post: Post) -> Optional[Punish]:
    text = post.contents.text
    if text.count('\n') > 132:
        # 闪光弹
        return Punish(post, Ops.DELETE, 3, note="闪光弹")

    # 作图广告
    for at in post.contents.ats:
        if at.user_id == 4928198503:
            return Punish(post, Ops.DELETE, note="作图广告")


@tbr.reviewer.comments.append_filter
async def comments_conti_filter(comments: List[Comment]) -> List[Punish]:
    # 使用过滤器删除多条相互关联的内容
    pass


# 使用装饰器将以下函数设置为针对楼中楼的checker
@tbr.reviewer.comment.set_checker()
async def check_comment(comment: Comment) -> Optional[Punish]:
    # 自行堆叠函数以复用checker
    # 例如此处的check_text就可以被多个checker复用
    punish = await _check_comment(comment)
    if punish:
        return punish
    punish = await check_text(comment)
    if punish:
        return punish


async def _check_comment(comment: Comment) -> Optional[Punish]:
    pass


async def check_text(obj: TypeObj) -> Optional[Punish]:
    if obj.user.level >= 3:
        return

    text = obj.text
    _check_text = KEY_WORD
    for i in _check_text:
        if re.search(i, text):
            return Punish(obj, Ops.DELETE, note="适用于3级以下用户的违规词汇")


class ReviewerThread(Thread):
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
                with tbr.no_test():
                    await tbr.run()
            else:
                await tbr.run(20)
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

        if args.no_test:
            with tbr.no_test():
                await tbr.run()
        else:
            await tbr.run(20.0)
    asyncio.run(main())

