from langchain.tools import tool
from datetime import datetime

@tool
def get_date():
    """返回当前日期，当需要获取当前日期时，请调用此函数。"""
    today = datetime.now()
    return today.strftime("%Y-%m-%d")


if __name__ == "__main__":
    print(get_date())