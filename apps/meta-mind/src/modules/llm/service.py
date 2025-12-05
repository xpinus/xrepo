from ollama import chat as ollama_chat, ChatResponse, embed as ollama_embed
from typing import Sequence

def chat(question: str):
    """ 对话 流式响应 """
    response: ChatResponse = ollama_chat(
        model='qwen2.5:0.5b', 
        messages=[
            {
                'role': 'user',
                'content': question,
            },
        ],
        stream=True,
    )
    return response


def embed(input: str | Sequence[str]):
    """ 生成 embeddings """
    batch = ollama_embed(model='bge-m3:latest', input=input)
    return batch['embeddings']