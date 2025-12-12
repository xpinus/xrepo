import json
import re
import aioredis
import asyncio
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from src.modules.news.model import NewsMessageDTO

async def test():
    redis = await aioredis.from_url(
        url="redis://localhost:6379",
        password="97716",
        encoding="utf-8",
        decode_responses=True,
    )
    print(await redis.publish("NEWS", "hello"))
    print(await redis.publish("NEWS", json.dumps(dict(id="1", title="hello"))))
    print(await redis.publish("NEWS", NewsMessageDTO(
        id="1", lang="zh", title="hello-news", content="hello"
    ).model_dump_json()))

if __name__ == "__main__":
    asyncio.run(test())  # 使用 asyncio.run() 运行异步函数