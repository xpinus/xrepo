from pydantic import BaseModel

class NewsMessageDTO(BaseModel):
    """新闻消息数据传输对象"""
    id: str
    lang: str
    title: str
    content: str
    label: str | None = None