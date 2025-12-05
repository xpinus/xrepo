from contextlib import asynccontextmanager
import uvicorn
from fastapi import FastAPI
from core.config import AppConfigDep
from core.redis import redis_client
from core.milvus import milvus_client
from modules.news.router import router as news_router
from modules.news.service import startup as news_startup
from modules.llm.router import router as llm_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # start up
    await redis_client.connect()
    await milvus_client.connect()
    news_startup()
    
    yield

    # shutdown
    await redis_client.disconnect()
    milvus_client.disconnect()


app = FastAPI(lifespan=lifespan)

app.include_router(news_router)
app.include_router(llm_router)

@app.get("/")
def hello(config: AppConfigDep):
    return {
        "message": "Hello World ",
        "data": config  
    }

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=6002, reload=True)