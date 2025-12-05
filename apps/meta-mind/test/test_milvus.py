from time import sleep
from ollama import embed
import numpy as np
from pymilvus import MilvusClient

"""向量化数据""" 
docs = [
    "Artificial intelligence was founded as an academic discipline in 1956.",
    "Alan Turing was the first person to conduct substantial research in AI.",
    "Born in Maida Vale, London, Turing was raised in southern England.",
]

vectors = embed(model="bge-m3:latest", input=docs)
vectors = np.array(vectors.embeddings)
print("Shape:", vectors[0].shape)  # 现在可以使用 shape 属性

data = [
    {"id": i, "vector": vectors[i], "text": docs[i], "subject": "history"}
    for i in range(len(vectors))
]

print("Data has", len(data), "entities, each with fields: ", data[0].keys())
print("Vector dim:", len(data[0]["vector"]))

"""创建 Milvus 索引"""
client = MilvusClient()
if "milvus_demo" not in client.list_databases():
    client.create_database(db_name="milvus_demo")
client.use_database("milvus_demo")

if client.has_collection(collection_name="demo_collection"):
    client.drop_collection(collection_name="demo_collection")
client.create_collection(
    collection_name="demo_collection",
    dimension=1024,  # The vectors we will use in this demo has 768 dimensions
)

insert_res = client.insert(collection_name="demo_collection", data=data)

print("insert_res", insert_res)

sleep(5)  # 可能存在一个短暂的初始化过程，如果立即检索检索不到结果


"""检索"""
query_vectors = embed(model="bge-m3:latest", input="Where was Turing born?")
query_vectors = np.array(query_vectors.embeddings)

res = client.search(
    collection_name="demo_collection",
    data=query_vectors,
    filter="subject == 'history'",
    limit=2,
    output_fields=["text", "subject"],
)

print(res)

"""清除测试数据"""
client.drop_collection(collection_name="demo_collection")
client.drop_database("milvus_demo")