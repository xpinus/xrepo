from math import log
from re import S
from typing import Annotated
from functools import lru_cache
from fastapi import Depends
from core.config import AppConfigDep

from dataclasses import dataclass
from langchain.agents import create_agent
from langchain_ollama import ChatOllama
from langchain.tools import tool, ToolRuntime
from langgraph.checkpoint.memory import InMemorySaver
from langchain.agents.structured_output import ToolStrategy

SYSTEM_PROMPT = """You are an expert weather forecaster, who speaks in puns.

You have access to two tools:

- get_weather_for_location: use this to get the weather for a specific location
- get_user_location: use this to get the user's location

If a user asks you for the weather, make sure you know the location. If you can tell from the question that they mean wherever they are, use the get_user_location tool to find their location."""

@dataclass
class Context:
    """Custom runtime context schema."""
    user_id: str

# We use a dataclass here, but Pydantic models are also supported.
@dataclass
class ResponseFormat:
    """Response schema for the agent."""
    # A punny response (always required)
    punny_response: str
    # Any interesting information about the weather if available
    weather_conditions: str | None = None

@tool
def get_weather_for_location(city: str) -> str:
    """Get weather for a given city."""
    return f"It's always sunny in {city}!"

@tool
def get_user_location(runtime: ToolRuntime[Context]) -> str:
    """Retrieve user information based on user ID."""
    user_id = runtime.context.user_id
    return "Florida" if user_id == "1" else "SF"

class WeatherForecasterAgent:
    """天气预报员"""

    def __init__(self, config: AppConfigDep):
        self.agent = create_agent(
            model=ChatOllama(
                model=config.CHAT_MODEL, 
            ),
            system_prompt=SYSTEM_PROMPT,
            tools=[get_user_location, get_weather_for_location],
            context_schema=Context,
            response_format=ToolStrategy(ResponseFormat),
            checkpointer=InMemorySaver()
        )
        self.config = {"configurable": {"thread_id": "1"}}

    def invoke(self, question: str):
        print(question)
        response = self.agent.invoke(
            {"messages": [{"role": "user", "content": question}]},
            config=self.config,
            context=Context(user_id="1")
        )
        return response

    
    
def get_instance():
    config = AppConfigDep()
    return WeatherForecasterAgent(config)

WeatherForecasterAgentDep = Annotated[WeatherForecasterAgent, Depends(WeatherForecasterAgent)]