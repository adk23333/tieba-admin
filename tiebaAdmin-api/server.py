import argparse
import json
from utils import json as se_json
import tomli
from sanic import Sanic
from sanic.log import logger
from sanic_ext import Extend
from reviewer import ReviewerThread, HandleThread


KEYWORD_PATH = "./keyword.json"

"""
获取启动参数，默认为开发模式，生产模式须加上--prd
"""
parser = argparse.ArgumentParser()
parser.add_argument(
    "--prd",
    help="测试模式默认开启以避免误操作 生产环境下使用该选项将其关闭",
    action="store_true",
)
args = parser.parse_args()
with open('./setting.toml', 'rb') as f:
    if args.prd:
        SETTING_CONFIG = tomli.load(f).get('Prd')
    else:
        SETTING_CONFIG = tomli.load(f).get('Dev')
    if SETTING_CONFIG is None:
        logger.error("请正确填写toml文件")
        raise KeyError

app = Sanic(__name__)
Extend(app)


@app.listener("before_server_start")
async def init_self_plugin(mapp):
    mapp.ctx.reviewer = ReviewerThread(False, await get_keyword())
    mapp.ctx.handler = HandleThread()


def init_config():
    app.config.update(
        SETTING_CONFIG['App'],
    )


async def get_keyword():
    with open(KEYWORD_PATH, "r", encoding='utf-8') as _f:
        return json.load(_f)


@app.get('/api/v1/reviewer/switch')
async def reviewer_switch(request):
    if app.ctx.reviewer.is_alive():
        app.ctx.reviewer.stop()
        res = se_json("切换成功", {"status": not app.ctx.reviewer.stopped()})
        app.ctx.reviewer = ReviewerThread(False, await get_keyword())
    else:
        if not app.ctx.reviewer.stopped():
            app.ctx.reviewer.start()
        else:
            app.ctx.reviewer = ReviewerThread(False, await get_keyword())
        res = se_json("切换成功", {"status": app.ctx.reviewer.is_alive()})

    return res


@app.get('/api/v1/reviewer/query')
async def reviewer_query(request):
    status = app.ctx.reviewer.is_alive()
    if status:
        return se_json("审查工具已开启", {'status': status})
    else:
        return se_json("审查工具已关闭", {'status': status})


@app.get('/api/v1/reviewer/keyword/query')
async def keyword_query(request):
    with open(KEYWORD_PATH, 'r', encoding='utf-8') as _f:
        keywords = json.load(_f)
    return se_json("成功", {'keywords': keywords})


@app.get('/api/v1/reviewer/keyword/update')
async def keyword_update(request):
    with open(KEYWORD_PATH, 'a+', encoding='utf-8') as _f:
        _f.truncate(0)
    with open(KEYWORD_PATH, 'w', encoding='utf-8') as _f:
        json.dump(request.args.getlist('keywords'), _f, indent=4)
    return se_json("成功", {'keywords': request.args.getlist('value')})


@app.get('/api/v1/handler/switch')
async def handler_switch(request):
    if app.ctx.handler.is_alive():
        app.ctx.handler.stop()
        res = se_json("切换成功", {"status": not app.ctx.handler.stopped()})
        app.ctx.handler = HandleThread()
    else:
        if not app.ctx.handler.stopped():
            app.ctx.handler.start()
        else:
            app.ctx.handler = HandleThread()
        res = se_json("切换成功", {"status": app.ctx.handler.is_alive()})

    return res


@app.get('/api/v1/handler/query')
async def handle_query(request):
    status = app.ctx.handler.is_alive()
    if status:
        return se_json("审查工具已开启", {'status': status})
    else:
        return se_json("审查工具已关闭", {'status': status})

init_config()
if __name__ == '__main__':

    app.run(host=SETTING_CONFIG['Run']['host'],
            port=SETTING_CONFIG['Run']['port'],
            dev=SETTING_CONFIG['Run']['debug'],
            debug=SETTING_CONFIG['Run']['debug'],
            ssl=SETTING_CONFIG['Run'].get('ssl'))
