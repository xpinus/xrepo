from fastapi import APIRouter
from .service import AssistantServiceDep

router = APIRouter(
    prefix="/assistant",      # 为这个路由器的所有路径添加前缀
    tags=["ollama", "assistant"],       # 在 OpenAPI 文档中分组
)

@router.get("/chat")
async def chat(question: str, assistant_service: AssistantServiceDep):
    return assistant_service.chat(question)
