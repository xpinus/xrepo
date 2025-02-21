# axios

![xhr](../../场景应用/进度监控/asset/xhr功能.png)

## 封装axios

[TypeScript实战之用TS封装Axios](https://juejin.cn/post/7113475007598034951)

> 请求和响应拦截

> axios如何取消请求、原理

1. `AbortController`

通过 new AbortController() 创建实例，实例包含 signal 属性和 abort 方法。

将 signal 传递给axios请求配置，Axios 内部会监听该 signal, 

调用 abort 方法时，signal 触发 abort 事件，Axios 检测到后终止请求并抛出 Cancel 错误

2. `axios.CancelToken` 传统方式，适用于较旧版本的 Axios

## 进度监控

`xhr.progress`事件

fetch

总数据量：响应头`Content-length`
resp.body.getReader 读取返回的流
累加reader.read()读取的数据量，然后计算百分比，更新到进度条上


## 浏览器端xhr不支持stream

使用 fetch 和 ReadableStream

```js
async function streamResponse(url, data) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // 检查响应是否正常
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // 获取可读流
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    // 读取数据流
    while (true) {
      const { done, value } = await reader.read();
      if (done) break; // 流结束

      // 解码并处理数据块
      const chunk = decoder.decode(value, { stream: true });
      console.log(chunk); // 或者逐字显示到页面上
    }

    console.log('Stream ended');
  } catch (error) {
    console.error('Error:', error);
  }
}

// 示例使用
const url = 'https://api.example.com/stream'; // 替换为你的API地址
const data = {
  prompt: "Hello, how are you?",
  max_tokens: 50,
};

streamResponse(url, data);
```