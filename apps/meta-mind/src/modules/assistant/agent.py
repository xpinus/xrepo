from typing import Annotated
from fastapi import Depends
from functools import lru_cache
from langchain.agents import create_agent
from langchain_ollama import ChatOllama

from core.config import get_appconfig
from .tools.date import get_date
from .tools.huangli import get_huangli

class AssistantAgent:
    """AI助手"""

    def __init__(self):
        config  = get_appconfig()
        self.agent = create_agent(
            model=ChatOllama(
                model=config.CHAT_MODEL, 
                temperature=0.88, # 提高温度会让模型的回答更有创意
                top_p=0.9, # 较高的值会生成更多样化的文本
                top_k=40, # 减少生成无意义内容的可能性
            ),
            tools=[get_date, get_huangli],
            system_prompt="You are a helpful assistant",
        )
    
    def invoke(self, question: str):
        print(question)
        response = self.agent.invoke(
            {"messages": [{"role": "user", "content": question}]}
        )
        return response
    
@lru_cache
def get_instance():
    return AssistantAgent()

AssistantAgentDep = Annotated[AssistantAgent, Depends(get_instance)]