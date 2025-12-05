from fastapi import APIRouter
from pydantic import BaseModel
from typing import List

router = APIRouter(
    prefix="/news",      # 为这个路由器的所有路径添加前缀
    tags=["news"],       # 在 OpenAPI 文档中分组
)

@router.get("/")
async def list():
    return {"message": "Hello news"}


class DeleteDTO(BaseModel):
    ids: List[str]

@router.post("/delete")
async def delete(delete_dto: DeleteDTO):
   return {"message": "Delete news", "ids": ",".join(delete_dto.ids)}