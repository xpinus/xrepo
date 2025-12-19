import asyncio
from typing import Dict, Callable
import aioredis
from core.config import get_appconfig

class RedisClient:
    """Redis 连接管理器，采用单例模式"""
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.redis_client = None
            cls._instance.pubsubs: Dict[str, aioredis.Redis] = {}  # 存储频道与pubsub的映射
        return cls._instance

    async def connect(self):
        """初始化Redis连接"""
        if not self.redis_client:
            config = get_appconfig()
            # 使用连接池，编码设为utf-8
            self.redis_client = await aioredis.from_url(
                url=config.REDIS_URL,
                password=config.REDIS_PASSWORD,
                encoding="utf-8",
                decode_responses=True,
            )
            print("Redis连接已建立")

    async def get_pubsub(self, channel: str) -> aioredis.client.PubSub:
        """获取或创建指定频道的PubSub对象"""
        if channel not in self.pubsubs:
            pubsub = self.redis_client.pubsub()
            await pubsub.subscribe(channel)
            self.pubsubs[channel] = pubsub
        return self.pubsubs[channel]

    async def publish(self, channel: str, message: str):
        """发布消息到指定频道"""
        await self.redis_client.publish(channel, message)

    async def subscribe(self, channel: str, callback: Callable[[str], None]):
        """订阅频道"""
        pubsub = await self.get_pubsub(channel)
        print(f"订阅 to {channel}")
        try:
            async for message in pubsub.listen():
                if message["type"] == "message":
                    # 将接收到的消息发送给WebSocket客户端
                    callback(message["data"])
        except asyncio.CancelledError:
            # 客户端断开连接时取消订阅
            await pubsub.unsubscribe(channel)
            await pubsub.close()
            del self.pubsubs[channel]

    async def disconnect(self):
        """关闭所有连接"""
        for pubsub in self.pubsubs.values():
            await pubsub.close()
        if self.redis_client:
            await self.redis_client.close()
        print("Redis连接已关闭")

# 创建全局管理器实例
redis_client = RedisClient()