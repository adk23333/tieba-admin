import unittest

from tortoise import Tortoise

from .reviewer import Reviewer


class MyTestCase(unittest.IsolatedAsyncioTestCase):
    def __init__(self, method_name='runTest'):
        super().__init__(method_name)

    async def test_init(self):
        await Tortoise.init(db_url="sqlite://../../.cache/db.sqlite",
                            modules={"models": ["core.models", "review.models"]})
        await Reviewer.init_plugin()

    async def test_run(self):
        reviewer = Reviewer()
        reviewer.PLUGIN_MODEL = "review.models"

        await reviewer._start_plugin_with_process(
            db_url="sqlite://../../.cache/db.sqlite",
            log_level="DEBUG",
            models=["core.models", reviewer.PLUGIN_MODEL],
        )


if __name__ == '__main__':
    unittest.main()
