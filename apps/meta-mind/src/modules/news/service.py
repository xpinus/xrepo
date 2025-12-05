import asyncio
from core.redis import redis_client
from .constants import NEWS_TOPIC
def startup():
    asyncio.create_task(redis_client.subscribe(NEWS_TOPIC, newsMessageHandler))


def newsMessageHandler(message):
    print(message)