from typing import Annotated
from fastapi import Depends

from core.config import AppConfigDep
from modules.llm.agents.assistant import AssistantAgentDep 
from modules.llm.agents.weather import WeatherForecasterAgent as AgentDep

class LLMService:
    """ LLM 模型服务 """

    def __init__(self, config: AppConfigDep, agent: AgentDep):
        self.agent = agent

    def chat(self, question: str):
        """ 对话 """
        response = self.agent.invoke(
           question
        )
        return response
    
    def translate(text: str):
        """ 翻译 """
        return text

LLMServiceDep = Annotated[LLMService, Depends(LLMService)]



