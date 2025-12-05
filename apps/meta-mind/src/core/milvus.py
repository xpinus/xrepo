from pymilvus import MilvusClient as _MilvusClient
from core.config import get_appconfig

class MilvusClient:
    """Milvus 连接管理器，采用单例模式"""
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.milvus_client = None
        return cls._instance
    
    async def connect(self):
        """初始化 Milvus 连接"""
        if not self.milvus_client:
            config = get_appconfig()
            self.milvus_client = _MilvusClient()

            # 如果数据库不存在，则创建
            if config.MILVUS_DB_NAME not in self.milvus_client.list_databases():
                self.milvus_client.create_database(db_name=config.MILVUS_DB_NAME)

            self.milvus_client.use_database(db_name=config.MILVUS_DB_NAME)

            if not self.milvus_client.has_collection(collection_name=config.MILVUS_COLLECTION_NAME):
                self.milvus_client.create_collection(
                    collection_name=config.MILVUS_COLLECTION_NAME,
                    dimension=config.MILVUS_VECTOR_DIMENSION,
                )

            print("Milvus 连接已建立")
            

    def disconnect(self):
        """关闭 Milvus 连接"""
        if self.milvus_client:
            self.milvus_client.close()
        print("Milvus 连接已关闭")

    
milvus_client = MilvusClient()