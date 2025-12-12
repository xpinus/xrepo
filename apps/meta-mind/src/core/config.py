from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache
from typing import Annotated
from fastapi import Depends

class AppConfig(BaseSettings):
    APP_NAME: str = "MetaMind"
    ADMIN_EMAIL: str ="pinus0716@163.com"
    
    REDIS_URL: str
    REDIS_PASSWORD: str

    MILVUS_URI: str
    MILVUS_DB_NAME: str 
    MILVUS_COLLECTION_NAME: str
    MILVUS_VECTOR_DIMENSION: int

    CHAT_MODEL: str
    EMBEDDING_MODEL: str
    TRANSLATION_MODEL: str

    model_config = SettingsConfigDict(
        env_file=".env", # 指定 .env 文件路径
        env_file_encoding="utf-8", # 设置文件编码
        case_sensitive=True, # 强制区分大小写
        extra="forbid", # 禁止额外的环境变量
    )
 
@lru_cache()
def get_appconfig():
    return AppConfig()

AppConfigDep = Annotated[AppConfig, Depends(get_appconfig)]