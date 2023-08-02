import asyncio

import aiotieba


class MyTestCase():
    async def test_something(self):
        async with aiotieba.Client("admin") as client:
            threads = await client.get_threads("变嫁")

        for i in threads:
            print(i)


if __name__ == '__main__':
    asyncio.run(MyTestCase().test_something())
