# 如何解决接口大规模并发问题

**滑动窗口**，专门用来控制流量

## 方案

1. 请求队列
```js
class RequestQueue {
    constructor() {
        this.queue = [];
        this.maxConcurrent = 5;
        this.currentConcurrent = 0;
    }
    
    add(request) {
        return new Promise((resolve, reject) => {
            this.queue.push({request, resolve, reject});
            this.processQueue();
        })      
    }
    
    processQueue() {
        if (this.currentConcurrent < this.maxConcurrent && this.queue.length > 0) {
            const {request, resolve, reject} = this.queue.shift();
            this.currentConcurrent++;
            request.then(resolve).catch(reject).finally(() => {
                this.currentConcurrent--;
                this.processQueue();
            });
        }
    }
}

// 示例：
const requestQueue = new RequestQueue();

const urls = [
    'https://www.test.com/api/data1',
    'https://www.test.com/api/data2',
    // ...
]

const requests = urls.map(url => fetch(url));
Promise.all(requests.map(req => requestQueue.add(req)));


```
2. 防抖节流
3. 分页加载/无限滚动 **可视区绘制**
4. 如果是大量小图引起的，可以考虑雪碧图，打包base64，将资源部署在CDN图床
5. 搭建BFF,合并请求，绕开浏览器请求限制