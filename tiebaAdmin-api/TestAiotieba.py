import asyncio

import aiotieba


class MyTestCase():
    async def test_something(self):
        async with aiotieba.Client("admin") as client:
            threads = await client.get_self_info()

        print(threads)


if __name__ == '__main__':
    asyncio.run(MyTestCase().test_something())
