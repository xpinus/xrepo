from langchain.tools import tool
from datetime import datetime

@tool
def get_date():
    """用于获取当前日期，当需要获取当前日期时，必须调用此函数。"""
    today = datetime.now()
    return today.strftime("%Y-%m-%d")


if __name__ == "__main__":
    print(get_date())