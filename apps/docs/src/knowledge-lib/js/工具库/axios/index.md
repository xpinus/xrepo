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
