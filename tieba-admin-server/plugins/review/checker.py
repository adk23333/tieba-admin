import re
from typing import Union

from aiotieba import Client
from aiotieba.typing import Thread, Post, Comment

from core.models import ForumUserPermission, Permission
from .execute import empty, delete, block
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


@reviewer.route(['thread', 'post', 'comment'])
async def check_black(t: Union[Thread, Post, Comment], client: Client):
    user = await ForumUserPermission.filter(user=t.user.user_id, permission=Permission.Black.value).get_or_none()
    if user:
        return block(client, t, 10)
    return empty()
