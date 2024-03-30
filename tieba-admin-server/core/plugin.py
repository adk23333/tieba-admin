import asyncio
import traceback

from pigar.log import logger


class Plugin(object):
    """
    插件基类，定义了一个插件应该有的属性及方法
    """

    def __init__(self):
        self.kwargs = {}

    def on_start(self):
        ...

    async def async_start(self):
        ...

    def on_running(self):
        ...

    async def async_running(self):
        ...

    def on_stop(self):
        ...

    async def async_stop(self):
        ...

    def start_plugin_with_process(self, **kwargs):
        self.kwargs = kwargs
        try:
            self.on_start()
            asyncio.run(self.async_start())

            self.on_running()
            asyncio.run(self.async_running())

        except Exception:
            logger.warning(repr(traceback.format_exc()))

        except KeyboardInterrupt:
            pass

    def __del__(self):
        asyncio.run(self.async_stop())
        self.on_stop()
