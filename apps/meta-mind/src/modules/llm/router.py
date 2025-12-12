from fastapi import APIRouter
from .service import LLMServiceDep

router = APIRouter(
    prefix="/llm",      # 为这个路由器的所有路径添加前缀
    tags=["ollama", "llm"],       # 在 OpenAPI 文档中分组
)

@router.get("/chat")
async def chat(question: str, llm_service: LLMServiceDep):
    return llm_service.chat(question)

@router.get("/tts")
async def tts(text: str):
    return 'tts'