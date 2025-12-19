import json
import asyncio
from core.redis import redis_client
from .constants import NEWS_TOPIC
from .dal import NewsDAL
from .model import NewsMessageDTO, NewsMessagePO
from utils.embeddings import get_embeddings
from .agent import NewsAgent

class NewsListener:
    """ sub Redis 新闻 """
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    def __init__(self):
        self.news_dal = NewsDAL()
        self.embeddings = get_embeddings()
        self.news_agent = NewsAgent()
        
    def listen(self):
        """订阅redis频道"""
        asyncio.create_task(redis_client.subscribe(NEWS_TOPIC, news_listener.handle_news_message))
    
    def handle_news_message(self, message: str):
        """处理爬取到的新闻消息"""
        try:
            message_data = json.loads(message)
            news_message = NewsMessageDTO(**message_data)
            
            print(f"接收到新闻消息: {news_message.title}")
            
            # 进行后续业务逻辑处理
            self.insert_news(news_message)
        except json.JSONDecodeError:
            print("新闻消息格式不是有效的 JSON")
        except Exception as e:
            print(f"新闻消息处理异常: {e}")

    def insert_news(self, news_message: NewsMessageDTO):
        """插入新闻到向量数据库"""

        if self.news_dal.exists(news_message.id): 
            return

        if len(news_message.content) > 500:
            news_message.content = self.news_agent.summary(news_message.content)

        vectors = self.embeddings.embed([news_message.title, news_message.content])

        data = NewsMessagePO(
            id=news_message.id,
            title=news_message.title,
            content=news_message.content,
            title_vector=vectors[0],
            content_vector=vectors[1],
            label=news_message.label,
            meta=news_message.meta,
        )

        self.news_dal.insert_news(data)
    
    def startup(self):
        """初始化时订阅redis频道"""
        asyncio.create_task(redis_client.subscribe(NEWS_TOPIC, self.handle_news_message))

# 单例
news_listener = NewsListener()
    

