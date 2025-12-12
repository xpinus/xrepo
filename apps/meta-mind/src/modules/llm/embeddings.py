from typing import Annotated, List
from functools import lru_cache
from fastapi import Depends
from langchain_ollama import OllamaEmbeddings

from core.config import AppConfigDep


class Embeddings:
    """数据向量化嵌入"""

    def __init__(self, config: AppConfigDep):
        self.embeddings = OllamaEmbeddings(
            model=config.EMBEDDING_MODEL
        )

    def embed(self, input: str | List[str]):
        """ 生成 embeddings """
        texts = input if isinstance(input, list) else [input]
        return self.embeddings.embed_documents(texts)

EmbeddingsDep = Annotated[Embeddings, Depends(Embeddings)]