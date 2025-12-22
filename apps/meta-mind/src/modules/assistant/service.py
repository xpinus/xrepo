from typing import Annotated, List
from functools import lru_cache
from fastapi import Depends

from .agent import AssistantAgentDep

class AssistantService:
    """ AI助手服务 """

    def __init__(self, agent: AssistantAgentDep):
        self.agent = agent

    def chat(self, question: str):
        """ 对话 """
        response = self.agent.invoke(
           question
        )
        return response
    
    # def translate(text: str, target_lang: str = 'zh-CN'):
    #     """ 翻译 """
    #     return text


AssistantServiceDep = Annotated[AssistantService, Depends(AssistantService)]



