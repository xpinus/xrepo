from functools import lru_cache
from typing import Annotated
from fastapi import Depends
from core.config import AppConfig, get_appconfig
from langchain.agents import create_agent
from langchain_ollama import ChatOllama
from langchain.tools import tool
from .dal import get_news_dal
import json

@tool
def get_news(n: int) -> str:
    """获取最近n小时的新闻"""
    news_dal = get_news_dal()
    return news_dal.get_recent_news(n)


class NewsAgent:
    """新闻编辑"""
    __instance = None

    def __new__(cls):
        if cls.__instance is None:
            cls.__instance = super().__new__(cls)
        return cls.__instance

    def __init__(self):
        config = get_appconfig()
        self.agent = create_agent(
            model=ChatOllama(
                model=config.CHAT_MODEL, 
                temperature=0.3, # 提高温度会让模型的回答更有创意
                # top_p=0.9, # 较高的值会生成更多样化的文本
                # top_k=40, # 减少生成无意义内容的可能性
            ),
            tools=[get_news],
            system_prompt="Y你是一个专业的新闻编辑。",
        )

    def summary(self, content: str):
        result=self.agent.invoke(
            {
                "messages": [
                    {"role": "system", "content": "使用200字以内进行新闻总结。"},
                    {"role": "user", "content": content}
                ]
            }
        )
    
        return result["messages"][-1].text
    
    def hot_news(self):
        result=self.agent.invoke(
            {
                "messages": [
                    {"role": "user", "content": """
                    你的任务是获取并总结最近24小时内的热点新闻。

                    严格遵循以下步骤：
                    1. 首先调用 get_news 工具获取最近24小时的新闻数据
                    2. 基于实际获取的新闻数据，筛选并总结不超过10条最重要的热点新闻
                    3. 如果没有获取到任何新闻，返回空数组[]

                    输出格式必须是严格的JSON数组，格式如下：
                    [
                    { "title": "热点新闻标题(50字以内)", "value": "热点新闻摘要(200字以内)"}
                    ...
                    ]

                    重要提醒：
                    - 必须先调用 get_news(24) 工具获取真实数据
                    - 绝对不能编造新闻内容
                    - 如果没有真实新闻数据，直接返回 []
                     """
                    }
                ],
                "force_tool_use": True
            }
        )

        return json.loads(result["messages"][-1].text)

    
    def invoke(self, question: str):
        print(question)
        response = self.agent.invoke(
            {"messages": [{"role": "user", "content": question}]}
        )
        return response

NewsAgentDep = Annotated[NewsAgent, Depends(NewsAgent)]