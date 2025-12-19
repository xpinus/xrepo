from gc import collect
from core.config import get_appconfig
from core.milvus import connect_milvus
from pymilvus import FieldSchema, CollectionSchema, DataType, MilvusClient
from functools import lru_cache
from typing import Annotated
from fastapi import Depends
import time

from .model import NewsMessagePO

class NewsDAL:
    """ Data Access Layer 数据持久层 - Milvus存储新闻数据 """
    def __init__(self):
        self.config = get_appconfig()
        self.collection_name=self.config.MILVUS_COLLECTION_NAME
        self.dimension=self.config.MILVUS_VECTOR_DIMENSION

        self.client = MilvusClient()
        # 如果数据库不存在，则创建
        if self.config.MILVUS_DB_NAME not in self.client.list_databases():
            self.client.create_database(self.config.MILVUS_DB_NAME)

        self.client.use_database(self.config.MILVUS_DB_NAME)

        if not self.client.has_collection(self.collection_name):
            self._create_collection()

    def _create_collection(self):
        """创建Collection"""
        schema=CollectionSchema(
            fields=[
                FieldSchema(name="id", dtype=DataType.VARCHAR, is_primary=True, auto_id=False, max_length=65535),
                FieldSchema(name="title_vector", dtype=DataType.FLOAT_VECTOR, dim=self.config.MILVUS_VECTOR_DIMENSION),
                FieldSchema(name="content_vector", dtype=DataType.FLOAT_VECTOR, dim=self.config.MILVUS_VECTOR_DIMENSION),
                FieldSchema(name="title", dtype=DataType.VARCHAR, max_length=512),
                FieldSchema(name="content", dtype=DataType.VARCHAR, max_length=65535),
                FieldSchema(name="label", dtype=DataType.ARRAY, max_capacity=100, element_type=DataType.VARCHAR, max_length=128),
                FieldSchema(name="meta", dtype=DataType.JSON),
                FieldSchema(name="created_at", dtype=DataType.INT64)
            ]
        )

        index_params = self.client.prepare_index_params()
        index_params.add_index(
            field_name="title_vector",
            index_type="AUTOINDEX",
            metric_type="COSINE", # 距离度量类型: L2, IP, COSINE
        )
        index_params.add_index(
            field_name="content_vector",
            index_type="AUTOINDEX",
            metric_type="COSINE", 
        )
        index_params.add_index(
            field_name="title",
            index_type="AUTOINDEX",
        )
        index_params.add_index(
            field_name="content",
            index_type="AUTOINDEX",
        )
        index_params.add_index(
            field_name="created_at",
            index_type="AUTOINDEX",
        )

        self.client.create_collection(
            collection_name=self.config.MILVUS_COLLECTION_NAME,
            dimension=self.config.MILVUS_VECTOR_DIMENSION,
            schema=schema,
            index_params=index_params,
            properties={
                "collection.ttl.seconds": 1209600 # 2周 TTL
            }
        )

    def insert_news(self, news: NewsMessagePO):
        """ 插入新闻 """
        self.client.insert(
            collection_name=self.config.MILVUS_COLLECTION_NAME,
            data=news.model_dump()
        )
        self.client.flush(
            collection_name=self.config.MILVUS_COLLECTION_NAME
        )
        print("插入新闻: {}".format(news.id))
    
    def exists(self, id: str):
        """ 判断新闻是否存在 """
        result = self.client.query(
            collection_name=self.config.MILVUS_COLLECTION_NAME,
            filter="id == '{}'".format(id),
            output_fields=["id"]
        )
        return len(result) > 0

    def get_recent_news(self, n: int):
        """ 获取最近n小时的新闻 """

        # n小时前
        since_time = int(time.time()) - (n * 3600)

        return self.client.query(
            collection_name=self.config.MILVUS_COLLECTION_NAME,
            filter="created_at > {}".format(since_time),
            output_fields=["title", "content"]
        )

@lru_cache
def get_news_dal():
    return NewsDAL()

NewsDalDep = Annotated[NewsDAL, Depends(get_news_dal)]