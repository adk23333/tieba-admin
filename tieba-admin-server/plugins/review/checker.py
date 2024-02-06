import re
from typing import Union

from aiotieba import Client
from aiotieba.typing import Thread, Post, Comment

from .execute import empty, delete
from .reviewer import Reviewer

reviewer = Reviewer()


@reviewer.route(['thread', 'post', 'comment'])
async def check_keyword(t: Union[Thread, Post, Comment], client: Client):
    print(t.text)
    if re.search(r"测试\+3", t.text):
        return delete(client, t)
    return empty()
