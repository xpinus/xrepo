import requests
from langchain.tools import tool

@tool
def get_huangli(date: str):
    """获取指定日期的黄历, 参数: date格式为yyyy-mm-dd"""
    url = f"http://127.0.0.1:6001/api/online/huangli?date={date}"
    
    try:
        response = requests.get(url)
        response.encoding = 'utf-8'
            
        return "\n".join(response.json().get("data"))
    
    except Exception as e:
        return f"获取黄历失败: {str(e)}"
    

if __name__ == "__main__":
    print(get_huangli("2025-12-22"))