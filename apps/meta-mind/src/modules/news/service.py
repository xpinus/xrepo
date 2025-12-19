
from fastapi import Depends
from typing import Annotated

from modules.llm.service import LLMServiceDep
from .agent import NewsAgentDep
from .dal import NewsDalDep
from .model import NewsMessagePO
from utils.embeddings import get_embeddings

class NewsService:
    """新闻服务"""
    def __init__(self, agent: NewsAgentDep, dal: NewsDalDep):
        self.agent = agent
        self.dal = dal
        self.embeddings = get_embeddings()

    def generate_hot_news(self):
        """生成热点新闻"""
        return self.agent.hot_news()
    
    def summarize_news(self, news: str):
        """总结新闻"""
        return self.agent.summary(news)
    
    def test(self):
        return self.dal.get_recent_news(3)
        

def get_news_service():
    return NewsService()

NewsServiceDep = Annotated[NewsService, Depends(NewsService)]