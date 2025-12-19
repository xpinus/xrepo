from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
from .service import NewsServiceDep


router = APIRouter(
    prefix="/news",      # 为这个路由器的所有路径添加前缀
    tags=["news"],       # 在 OpenAPI 文档中分组
)

@router.get("/")
async def list(news_service: NewsServiceDep):
    # return {"message": "Hello news"}
    return news_service.test()


class NewsDTO(BaseModel):
    content: str

@router.post("/sum")
def summarize(newsDTO: NewsDTO, news_service: NewsServiceDep):
    return news_service.summarize_news(newsDTO.content)

@router.get("/hot")
async def hot_news(news_service: NewsServiceDep):
    return news_service.generate_hot_news()


class DeleteDTO(BaseModel):
    ids: List[str]

@router.post("/delete")
async def delete(delete_dto: DeleteDTO):
   return {"message": "Delete news", "ids": ",".join(delete_dto.ids)}