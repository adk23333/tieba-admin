from typing import Dict

from core.models import Config
from core.utils import json
from sanic import Blueprint, Request

from .models import Keyword, Forum, Function

bp = Blueprint("review")


@bp.get("/api/review/info")
async def info(rqt: Request):
    return json(data={
        "status": None,
        "plugin": "review",
        "name": "内容审查",
        "desc": "开启这个插件后，将根据设定的关键词或者图片审查指定贴吧的帖子内容"
    })


@bp.post("/api/review/no_exec")
async def no_exec(rqt: Request):
    _no_exec = rqt.form.get("bool")
    if _no_exec:
        match _no_exec:
            case "1":
                await Config.set_config("REVIEW_NO_EXEC", str(True))
            case "0":
                await Config.set_config("REVIEW_NO_EXEC", str(False))
            case _:
                pass
    _no_exec = await Config.get_bool("REVIEW_NO_EXEC")
    return json(data={"REVIEW_NO_EXEC": _no_exec})


@bp.post("/api/review/keyword")
async def keyword(rqt: Request):
    keywords = rqt.json
    if not keywords:
        keywords = await Keyword.all()
        return json(data=[k.keyword for k in keywords])

    keywords = [Keyword(keyword=k) for k in keywords]
    await Keyword.all().delete()
    keywords = await Keyword.bulk_create(keywords)
    return json(data=[k.keyword for k in keywords])


@bp.post("/api/review/forum")
async def forum(rqt: Request):
    _forums: Dict = rqt.json
    if _forums:
        _f = await Forum.filter(fname=_forums["fname"]).get_or_none()
        if _f:
            _f.enable = _forums["enable"]
            await _f.save()
        else:
            await Forum.create(fname=_forums["fname"], enable=_forums["enable"])

    return json(data=[f.to_json() for f in await Forum.all()])


@bp.post("/api/review/function")
async def function(rqt: Request):
    _func: Dict = rqt.json
    if _func:
        _f = await Function.filter(fname=_func["fname"], function=_func["function"]).get_or_none()
        if _f:
            _f.enable = _func["enable"]
            await _f.save()
        else:
            await Function.create(function=_func["function"], fname=_func["fname"], enable=_func["enable"])

    return json(data=[f.to_json() for f in await Function.all()])
