from typing import Annotated
from fastapi import Depends
from core.config import AppConfigDep
from langchain.agents import create_agent
from langchain_ollama import ChatOllama
from langchain.tools import tool

class AssistantAgent:
    """聊天助手"""

    def __init__(self, config: AppConfigDep):
        self.agent = create_agent(
            model=ChatOllama(
                model=config.CHAT_MODEL, 
                # temperature=0.88, # 提高温度会让模型的回答更有创意
                # top_p=0.9, # 较高的值会生成更多样化的文本
                # top_k=40, # 减少生成无意义内容的可能性
            ),
            tools=[self.get_weather],
            system_prompt="You are a helpful assistant",
        )

    @tool
    def get_weather(city: str) -> str:
        """Get weather for a given city."""
        return f"It's always sunny in {city}!"
    
    def invoke(self, question: str):
        print(question)
        response = self.agent.invoke(
            {"messages": [{"role": "user", "content": question}]}
        )
        return response
    
def get_instance(config: AppConfigDep):
    return AssistantAgent(config)

AssistantAgentDep = Annotated[AssistantAgent, Depends(AssistantAgent)]