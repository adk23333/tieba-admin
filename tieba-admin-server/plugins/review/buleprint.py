from typing import List, Dict

from sanic import Blueprint, Request

from core.models import Config
from core.utils import json
from .models import Keyword, Forum, Function

bp = Blueprint("review")


@bp.post("/api/reviewer/no_exec")
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


@bp.post("/api/reviewer/keyword")
async def keyword(rqt: Request):
    keywords = rqt.form.getlist("list")
    if not keywords:
        keywords = await Keyword.all()
        return json(data=[k.keyword for k in keywords])

    keywords = [Keyword(keyword=k) for k in keywords]
    await Keyword.all().delete()
    keywords = await Keyword.bulk_create(keywords)
    return json(data=[k.keyword for k in keywords])


@bp.post("/api/reviewer/forum")
async def forum(rqt: Request):
    try:
        _forums: List[Dict] = rqt.json
        if _forums:
            for f in _forums:
                _f = await Forum.filter(fname=f["fname"]).get_or_none()
                if _f:
                    _f.enable = f["enable"]
                    await _f.save()
                else:
                    await Forum.create(fname=f["fname"], enable=f["enable"])
    except (KeyError, AttributeError, TypeError):
        pass
    finally:
        forums = []
        for f in await Forum.all():
            forums.append(f.to_json())

        return json(data=forums)


@bp.post("/api/reviewer/function")
async def function(rqt: Request):
    try:
        _func: List[Dict] = rqt.json
        if _func:
            for f in _func:
                _f = await Function.filter(fname=f["fname"], function=f["function"]).get_or_none()
                if _f:
                    _f.enable = f["enable"]
                    await _f.save()
                else:
                    await Function.create(function=f["function"], fname=f["fname"], enable=f["enable"])
    except (KeyError, AttributeError, TypeError):
        pass
    finally:
        forums = []
        for f in await Function.all():
            forums.append(await f.to_json())

        return json(data=forums)
