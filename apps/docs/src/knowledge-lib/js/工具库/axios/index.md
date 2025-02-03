# axios

![xhr](../../场景应用/进度监控/asset/xhr功能.png)

## 进度监控

`xhr.progress`事件

fetch

总数据量：响应头`Content-length`
resp.body.getReader 读取返回的流
累加reader.read()读取的数据量，然后计算百分比，更新到进度条上
