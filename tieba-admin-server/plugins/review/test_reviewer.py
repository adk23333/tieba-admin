import unittest

from tortoise import Tortoise

from .checker import reviewer


class MyTestCase(unittest.IsolatedAsyncioTestCase):
    def __init__(self, method_name='runTest'):
        super().__init__(method_name)

    async def test_run(self):
        await Tortoise.init(db_url="sqlite://../../.cache/db.sqlite",
                            modules={"models": ["core.models", "review.models"]})
        await Tortoise.generate_schemas()
        await reviewer.run()


if __name__ == '__main__':
    unittest.main()
