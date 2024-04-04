import asyncio
import traceback

from sanic.log import logger


class Plugin(object):
    """
    插件基类，定义了一个插件应该有的属性及方法
    """

    def __init__(self):
        self.kwargs = {}

    async def before_start(self):
        ...

    async def on_start(self):
        ...

    async def on_running(self):
        ...

    async def on_stop(self):
        ...

    async def _start_plugin_with_process(self):
        await self.on_start()
        await self.on_running()

    def start_plugin_with_process(self, **kwargs):
        self.kwargs = kwargs
        try:
            asyncio.run(self._start_plugin_with_process())

        except Exception:
            logger.warning(repr(traceback.format_exc()))

        except KeyboardInterrupt:
            pass

    def __del__(self):
        asyncio.run(self.on_stop())
