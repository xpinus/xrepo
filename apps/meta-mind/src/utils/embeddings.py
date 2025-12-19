from typing import Annotated, List
from functools import lru_cache
from fastapi import Depends

from core.config import get_appconfig
from langchain_ollama import OllamaEmbeddings

class Embeddings:
    """数据向量化嵌入"""

    def __init__(self):
        config = get_appconfig()
        self.embeddings = OllamaEmbeddings(
            model=config.EMBEDDING_MODEL
        )

    def embed(self, input: str | List[str]):
        """ 生成 embeddings """
        texts = input if isinstance(input, list) else [input]
        return self.embeddings.embed_documents(texts)
    

@lru_cache
def get_embeddings():
    return Embeddings()

EmbeddingsDep = Annotated[Embeddings, Depends(get_embeddings)]