import unittest

from .checker import reviewer


class MyTestCase(unittest.IsolatedAsyncioTestCase):
    def __init__(self, method_name='runTest'):
        super().__init__(method_name)

    async def test_run(self):
        reviewer.kwargs["models"] = ["core.models"]
        reviewer.review_model = "review.models"
        reviewer.kwargs["db_url"] = "sqlite://../../.cache/db.sqlite"
        await reviewer.async_start()
        await reviewer.async_running()


if __name__ == '__main__':
    unittest.main()
