# WebAPI

## 什么是事件代理

- 事件代理（`Event Delegation`），又称之为事件委托。是 `JavaScript` 中常用绑定事件的常用技巧。顾名思义，“事件代理”即是把原本需要绑定的事件委托给父元素，让父元素担当事件监听的职务。事件代理的原理是 DOM 元素的事件冒泡。使用事件代理的好处是可以提高性能
- 原理：事件冒泡
- <img src="https://img-blog.csdnimg.cn/2019011111581623.jpg" alt="img" style="zoom:150%;" />
  - 捕获阶段：从window对象传导到目标节点（上层传到底层）称为“捕获阶段”（capture phase），捕获阶段不会响应任何事件；
  - 目标阶段：在目标节点上触发，称为“目标阶段”
  - 冒泡阶段：从目标节点传导回window对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。事件代理即是利用事件冒泡的机制把里层所需要响应的事件绑定到外层；
    - `event.target`判断具体有哪个子节点触发
    - `target`是指获取事件的目标。`currentTarget`是指其事件处理程序当前正在处理事件的那个元素
- 优点：
    - 可以大量节省内存占用，减少事件注册，比如在`ul`上代理所有`li`的`click`事件就非常棒
    - 可以实现当新增子对象时无需再次对其绑定

- `event.target`

## 几个很实用的BOM属性对象方法

**location对象**

`location.href`-- 返回或设置当前文档的URL

`location.search` -- 返回URL中的查询字符串部分。

`location.hash` -- 返回URL#后面的内容，如果没有#，返回空

`location.host` -- 返回URL中的域名部分，例如www.dreamdu.com

`location.hostname` -- 返回URL中的主域名部分，例如dreamdu.com

`location.pathname` -- 返回URL的域名后的部分。例如 http://www.dreamdu.com/xhtml/ 返回/xhtml/

`location.port` -- 返回URL中的端口部分。例如 http://www.dreamdu.com:8080/xhtml/ 返回8080

`location.protocol` -- 返回URL中的协议部分。例如 http://www.dreamdu.com:8080/xhtml/ 返回(//)前面的内容http:

`location.assign` -- 设置当前文档的URL

`location.replace()` -- 设置当前文档的URL，并且在history对象的地址列表中移除这个URL location.replace(url);

`location.reload()` -- 重载当前页面

**history对象**

`history.go()` -- 前进或后退指定的页面数 history.go(num);

`history.back()` -- 后退一页

`history.forward()` -- 前进一页

**navigator对象**

`navigator.userAgent` -- 返回用户代理头的字符串表示(就是包括浏览器版本信息等的字符串)

`navigator.cookieEnabled` -- 返回浏览器是否支持(启用)cookie


**window对象**

`window.resize()`



## Geolocation API

```js
function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            ...
        }, (err) => { ... })
    } 
}
```

## 页面可见性

document.hidden  boolean  用户当前是否正在观看该页面

document.visibilityState  visible  hidden

visibilitychange事件

## 页面可见性

document.hidden  boolean  用户当前是否正在观看该页面

document.visibilityState  visible  hidden

visibilitychange事件

## Web Animation API

浏览器提供的原生js动画方案

https://www.bilibili.com/video/BV15E4m1R7tq/?spm_id_from=333.1387.0.0&vd_source=13577946ef3878abe2197cc65b72005c

