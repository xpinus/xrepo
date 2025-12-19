from pymilvus import MilvusClient, CollectionSchema

def connect_milvus(db_name: str, collection_name: str, schema: CollectionSchema, dimension: int, properties: dict = {}, ):
    """初始化 Milvus 连接"""
    milvus_client = MilvusClient()

    # 如果数据库不存在，则创建
    if db_name not in milvus_client.list_databases():
        milvus_client.create_database(db_name)

    milvus_client.use_database(db_name)

    if not milvus_client.has_collection(collection_name):
        milvus_client.create_collection(
            collection_name=collection_name,
            schema=schema,
            dimension=dimension,
            properties=properties,
        )

    print("Milvus 连接已建立: {db_name} - {collection_name}")
    return milvus_client

