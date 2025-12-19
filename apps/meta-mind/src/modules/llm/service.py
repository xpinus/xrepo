from typing import Annotated, List
from functools import lru_cache
from fastapi import Depends

from core.config import AppConfigDep
from utils.embeddings import EmbeddingsDep
# from modules.llm.agents.assistant import AssistantAgentDep 
# from modules.llm.agents.weather import WeatherForecasterAgent as AgentDep

class LLMService:
    """ LLM 模型服务 """

    def __init__(self, config: AppConfigDep, embeddings: EmbeddingsDep):
        self.config = config
        self.embeddings = embeddings

    # def chat(self, question: str):
    #     """ 对话 """
    #     response = self.agent.invoke(
    #        question
    #     )
    #     return response
    
    # def translate(text: str, target_lang: str = 'zh-CN'):
    #     """ 翻译 """
    #     return text


LLMServiceDep = Annotated[LLMService, Depends(LLMService)]



