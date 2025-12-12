import asyncio
import json
from functools import lru_cache
from fastapi import Depends
from typing import Annotated
from core.redis import redis_client
from .constants import NEWS_TOPIC
from .model import NewsMessageDTO
from modules.llm.service import LLMServiceDep

def startup():
    """初始化时订阅redis频道"""
    asyncio.create_task(redis_client.subscribe(NEWS_TOPIC, newsMessageHandler))

async def newsMessageHandler(message: str, llm_service: LLMServiceDep):
    """处理新闻消息"""
    try:
        message_data = json.loads(message)
        news_message = NewsMessageDTO(**message_data)

        if news_message.lang != "zh":
            # 非中文语言，进行翻译
            news_message.title = llm_service.translate(news_message.title)
            news_message.content = llm_service.translate(news_message.content)
        
        # 处理校验后的数据
        print(f"接收到新闻消息: {news_message.title}")
        # 进行后续业务逻辑处理

        # 存储进 Milvus

        # 设置redis过期标识, 过期后删除
        
    except json.JSONDecodeError:
        print("消息格式不是有效的 JSON")
    except Exception as e:
        print(f"消息校验失败: {e}")


class NewsService:
    """新闻服务"""

    def __init__(self, llm_service: LLMServiceDep):
        self.llm_service = llm_service

    def generate_hot_news(self):
        """生成热点新闻"""
        response = self.llm_service.chat("请生成10篇热点新闻")
        return response

@lru_cache()
def get_service():
    return NewsService()

NewsServiceDep = Annotated[NewsService, Depends(get_service)]