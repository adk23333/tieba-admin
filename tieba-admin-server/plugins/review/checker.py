from typing import Union

from aiotieba import Client
from aiotieba.typing import Thread, Post, Comment

from .execute import empty
from .reviewer import Reviewer

reviewer = Reviewer()


@reviewer.route(['thread', 'post', 'comment'])
async def check_keyword(t: Union[Thread, Post, Comment], client: Client):
    print(t.text)
    return empty()
