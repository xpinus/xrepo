# WebWorker

特点：
- 通过加载一个 JS 文件来进行大量复杂的计算，而不挂起主进程。通过 `postMessage` 和 `onMessage` 进行通信。
- 可以在 Worker 中通过 `importScripts(url)` 方法来加载 JavaScript 脚本文件。
- 可以使用 setTimeout( )，clearTimeout( )，setInterval( ) 和 clearInterval( ) 等方法。
- 可以使用 XMLHttpRequest 进行异步请求。
- 可以访问 navigator 的部分属性。
- 可以使用 JavaScript 核心对象。

缺点：
- 不能跨域加载 JavaScript
- Worker 内代码不能访问 DOM
- 使用 Web Worker 加载数据没有 JSONP 和 Ajax 加载数据高效。

属性和方法：
- self：self 关键值用来表示本线程范围内的作用域。
- postMessage( )：向创建线程的源窗口发送信息。
- onMessage：获取接收消息的事件句柄。
- importScripts(urls)：Worker 内部如果要加载其他脚本，可以使用该方法来导入其它 JavaScript 脚本文件。参数为该脚本文件的 URL 地址，导入的脚本文件必须与使用该线程文件的页面在同一个域中，并在同一个端口中。

<script setup>
import demo from './demo.vue'
</script>

<preview codePath="knowledge-lib/js/jsAPI/webworker/demo.vue">
    <demo />
</preview>

## 使用 web Worker 实现跨标签页通
web Worker 可分为两种类型：
- 专用线程 dedicated web worker。Dedicated web worker 随当前页面的关闭而结束，这意味着 Dedicated web worker 只能被创建它的页面访问
- 共享线程 shared web worker： 可以同时有多个页面的线程链接

> index1.html
```html
<body>
    <input type="text" name="" id="content" placeholder="请输入要发送的信息">
    <button id="btn">发送</button>
    <script>
        const content = document.querySelector("#content");
        const btn = document.querySelector("#btn");
        const worker = new SharedWorker('worker.js')
        btn.onclick = function () {
            worker.port.postMessage(content.value);
        }
    </script>
</body>
```

> index2.html
```html
<body>
    <script>
        const btn = document.querySelector("#btn");
        var worker = new SharedWorker('worker.js');
        worker.port.start()
        worker.port.addEventListener('message', (e) => {
            if(e.data){
                console.log('来自worker的数据：', e.data)
            }
        }, false);

        setInterval(function(){
            // 获取和发送消息都是调用 postMessage 方法，我这里约定的是传递'get'表示获取数据。
            worker.port.postMessage('get')
        },1000);
    </script>
</body>
```

> worker.js
```js
var data = '';
onconnect = function (e) {
    var port = e.ports[0]
    port.onmessage = function (e) {
        // 如果是 get 则返回数据给客户端
        if (e.data === 'get') {       
            port.postMessage(data);
            data = "";
        } else {    
            // 否则把数据保存                  
            data = e.data
        }
    }
}
```