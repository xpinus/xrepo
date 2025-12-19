from pydantic import BaseModel, Field
from typing import Dict, Any, List
import time

class NewsMessageDTO(BaseModel):
    """新闻消息 数据传输对象"""
    id: str
    title: str
    content: str
    link: str
    lang: str
    label: List[str] | None = None
    meta: Dict[str, Any] | None = None


class NewsMessagePO(BaseModel):
    """ 新闻数据持久层对象 """
    id: str
    title: str
    content: str
    title_vector: List[float]
    content_vector: List[float]
    label: List[str]
    meta: Dict[str, Any]
    created_at: int = Field(default_factory=lambda: int(time.time()))  # Unix 时间戳

