import unittest

from .checker import reviewer


class MyTestCase(unittest.IsolatedAsyncioTestCase):
    def __init__(self, method_name='runTest'):
        super().__init__(method_name)

    async def test_run(self):
        await reviewer.async_run(review_models="review.models", db_url="sqlite://../../.cache/db.sqlite")


if __name__ == '__main__':
    unittest.main()
