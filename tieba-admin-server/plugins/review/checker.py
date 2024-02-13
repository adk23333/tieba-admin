import re
from typing import Union

from aiotieba import Client
from aiotieba.typing import Thread, Post, Comment

from .execute import empty, delete
from .models import Keyword
from .reviewer import Reviewer, Level

reviewer = Reviewer()


@reviewer.route(['thread', 'post', 'comment'])
async def check_keyword(t: Union[Thread, Post, Comment], client: Client):
    if t.user.level in Level.LOW.value:
        keywords = await Keyword.all()
        for kw in keywords:
            if re.search(kw.keyword, t.text):
                return delete(client, t)
    return empty()
