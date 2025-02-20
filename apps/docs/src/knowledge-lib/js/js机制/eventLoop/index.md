# 事件循环EventLoop

> js是一个单线程同步执行的语言
> 
> 异步：某些函数不会立即执行，需要等到某个时机才会执行，叫异步函数

浏览器的线程：
- js执行引擎：负责执行js代码
- 渲染线程：负责渲染页面
- 计时器线程
- 事件监听线程：负责监听事件
- http网络线程：负责网络线程


[带你彻底弄懂Event Loop](https://segmentfault.com/a/1190000016278115)

> 宏任务和微任务都有哪些 

宏任务：script、setTimeOut、setInterval、setImmediate 

微任务:promise.then,process.nextTick、Object.observe、MutationObserver 

注意：Promise 是同步任务

## [面试题](/knowledge-lib/js/jsAPI/promiseA/)