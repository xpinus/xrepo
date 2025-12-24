from functools import lru_cache
from typing import Annotated
from fastapi import Depends
from core.config import AppConfig, get_appconfig
from langchain.agents import create_agent
from langchain_ollama import ChatOllama
from langchain.tools import tool
from .dal import get_news_dal
import json

def get_hot_news_prompt(n:int, news: str):
    return f"""
        从提供的新闻中提取出{n}条你认为最有影响力最热点的新闻。
        
        ##严格要求返回结果格式为json数组, 如下##
        [
        {{ "title": "新闻标题", "value": "新闻摘要"}}
        ...
        ]
        
        ##新闻数据如下##
        { news }
    """


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
                temperature=0.3, 
                num_ctx=40960,
                num_predict=-1,
                keep_alive=True,
            ),
            tools=[],
            system_prompt="你是一个专业的新闻编辑",
        )
        self.dal = get_news_dal()

    def summary(self, content: str):
        result=self.agent.invoke(
            {
                "messages": [
                    {"role": "system", "content": "使用150字以内进行新闻总结。"},
                    {"role": "user", "content": content}
                ]
            }
        )
    
        return result["messages"][-1].text
    
    def hot_news(self):
        recent_news = self.dal.get_recent_news(240)
        filtered_news = [{k: v for k, v in news.items() if k != 'id'} for news in recent_news]
        print(f"获取到 {len(filtered_news)} 条新闻")
        if not filtered_news:
            return []
        
        total_news = len(filtered_news)
        if total_news <= 20:
            # 新闻较少时，直接处理
            result = self.agent.invoke(
                {
                    "messages": [
                        {"role": "user", "content": get_hot_news_prompt(n=10, news=str(filtered_news))}
                    ],
                }
            )
            return result["messages"][-1].text # json.loads()
        
        # 根据新闻数量动态调整分块大小
        # 动态分块大小：新闻越多，每块越小
        if total_news <= 50:
            chunk_size = 15
            max_results_per_chunk = 3
        elif total_news <= 100:
            chunk_size = 10
            max_results_per_chunk = 2
        elif total_news <= 200:
            chunk_size = 8
            max_results_per_chunk = 2
        else:
            chunk_size = 5
            max_results_per_chunk = 1

        all_chunk_results = []
        
        # 分块处理新闻
        for i in range(0, len(filtered_news), chunk_size):
            news_chunk = filtered_news[i:i+chunk_size]
            
            chunk_result = self.agent.invoke(
                {
                    "messages": [
                        {"role": "user", "content": get_hot_news_prompt(n=max_results_per_chunk, news=str(news_chunk))}
                    ]
                }
            )
            
            try:
                chunk_hot_news = json.loads(chunk_result["messages"][-1].text)
                if isinstance(chunk_hot_news, list):
                    all_chunk_results.extend(chunk_hot_news)
            except json.JSONDecodeError:
                print(f"无法解析块 {i//chunk_size + 1} 的结果")
                print(chunk_result["messages"][-1].text)
                continue

        # 如果分块结果太多，进行二次聚合
        if len(all_chunk_results) > 10:
            final_result = self.agent.invoke(
                {
                    "messages": [
                        {"role": "user", "content": get_hot_news_prompt(n=10, news=str(all_chunk_results))}
                    ],
                }
            )
            print(final_result["messages"][-1].text)
            return json.loads(final_result["messages"][-1].text)
        else:
            return all_chunk_results

    
    def invoke(self, question: str):
        print(question)
        response = self.agent.invoke(
            {"messages": [{"role": "user", "content": question}]}
        )
        return response

NewsAgentDep = Annotated[NewsAgent, Depends(NewsAgent)]