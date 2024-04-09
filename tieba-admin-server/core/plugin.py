import asyncio

from sanic.log import logger


class BasePlugin(object):
    """
    插件基类，定义了一个插件应该有的属性及方法
    """
    PLUGIN_MODEL = None

    def __init__(self, **kwargs):
        self.kwargs = kwargs

    @classmethod
    async def init_plugin(cls):
        ...

    async def on_start(self):
        ...

    async def on_running(self):
        ...

    async def on_stop(self):
        ...

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        if exc_tb:
            logger.warning(f"[{self.__class__.__name__}] {exc_type}: {exc_val}")
        await self.on_stop()
        logger.info(f"[{self.__class__.__name__}] stopped.")

    @classmethod
    async def _start_plugin_with_process(cls, **kwargs):
        async with cls(**kwargs) as plugin:
            await plugin.on_start()
            await plugin.on_running()

    @classmethod
    def start_plugin_with_process(cls, **kwargs):
        try:
            logger.setLevel(kwargs["log_level"])
            logger.info(f"[{cls.__name__}] running.")
            asyncio.run(cls._start_plugin_with_process(**kwargs))
        except Exception:
            pass
        except KeyboardInterrupt:
            pass
