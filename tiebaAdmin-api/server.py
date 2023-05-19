import argparse
import json
from os import listdir
from os.path import splitext, exists

import tomli
from sanic import Sanic, response
from sanic.log import logger
from sanic_ext import Extend

from reviewer import ReviewerThread, HandleThread
from utils import json as se_json

KEYWORD_PATH = "./keyword.json"
if not exists(KEYWORD_PATH):
    with open(KEYWORD_PATH, 'w') as f:
        f.close()

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
    app.ctx.assets = listdir("./page/assets")


def init_config():
    app.config.update(
        SETTING_CONFIG['App'],
    )


async def get_keyword():
    with open(KEYWORD_PATH, "r", encoding='utf-8') as _f:
        return json.load(_f)


@app.get('/api/reviewer/switch', version=1)
async def reviewer_switch(request):
    try:
        if app.ctx.reviewer.is_alive():
            app.ctx.reviewer.stop()
            app.ctx.reviewer = ReviewerThread(False, await get_keyword())
            return se_json("切换成功", {"status": not app.ctx.reviewer.stopped()})
        else:
            if not app.ctx.reviewer.stopped():
                app.ctx.reviewer.start()
            else:
                app.ctx.reviewer = ReviewerThread(False, await get_keyword())
            return se_json("切换成功", {"status": app.ctx.reviewer.is_alive()})
    except Exception:
        return se_json("切换失败", {}, 500)


@app.get('/api/reviewer/info', version=1)
async def reviewer_query(request):
    status = app.ctx.reviewer.is_alive()
    if status:
        return se_json("审查器已开启", {'status': status})
    else:
        return se_json("审查器已关闭", {'status': status})


@app.get('/api/reviewer/keyword', version=1)
async def keyword_query(request):
    try:
        with open(KEYWORD_PATH, 'r', encoding='utf-8') as _f:
            keywords = json.load(_f)
        return se_json("查询成功", {'keywords': keywords})
    except Exception:
        return se_json("查询失败", {}, 500)


@app.get('/api/reviewer/keyword/update', version=1)
async def keyword_update(request):
    try:
        with open(KEYWORD_PATH, 'a+', encoding='utf-8') as _f:
            _f.truncate(0)
        with open(KEYWORD_PATH, 'w', encoding='utf-8') as _f:
            keywords = request.args.get('keywords').split(",")
            json.dump(keywords, _f, indent=4)
        return se_json("更新成功", {'keywords': request.args.get('keywords')})
    except Exception:
        return se_json("更新失败", {}, 500)


@app.get('/api/handler/switch', version=1)
async def handler_switch(request):
    try:
        if app.ctx.handler.is_alive():
            app.ctx.handler.stop()
            app.ctx.handler = HandleThread()
            return se_json("切换成功", {"status": not app.ctx.handler.stopped()})
        else:
            if not app.ctx.handler.stopped():
                app.ctx.handler.start()
            else:
                app.ctx.handler = HandleThread()
            return se_json("切换成功", {"status": app.ctx.handler.is_alive()})
    except Exception:
        return se_json("切换失败", {}, 500)


@app.get('/api/handler/info', version=1)
async def handle_query(request):
    status = app.ctx.handler.is_alive()
    if status:
        return se_json("权限管理已开启", {'status': status})
    else:
        return se_json("权限管理已关闭", {'status': status})


@app.get('/')
async def home(request):
    return await response.file("./page/index.html")


@app.get('/favicon.ico')
async def favicon(request):
    return await response.file('./page/favicon.ico')


@app.get('/assets/<file>')
async def assets(request, file):
    if file in app.ctx.assets:
        mime = None
        if splitext(file)[-1] == '.js':
            mime = 'text/javascript'
        return await response.file(f"./page/assets/{file}", mime_type=mime)
    else:
        return se_json("该页面不存在", {}, 404)


init_config()
if __name__ == '__main__':
    app.run(host=SETTING_CONFIG['Run']['host'],
            port=SETTING_CONFIG['Run']['port'],
            dev=SETTING_CONFIG['Run']['debug'],
            debug=SETTING_CONFIG['Run']['debug'],
            ssl=SETTING_CONFIG['Run'].get('ssl'))
