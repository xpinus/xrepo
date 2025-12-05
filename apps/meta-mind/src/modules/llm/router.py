from fastapi import APIRouter
from .service import chat, embed

router = APIRouter(
    prefix="/llm",      # 为这个路由器的所有路径添加前缀
    tags=["ollama", "llm"],       # 在 OpenAPI 文档中分组
)

@router.get("/chat")
async def cchat(question: str):
    return chat(question)