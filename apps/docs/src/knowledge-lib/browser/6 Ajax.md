---
sort: 6
---

# Ajax 原理

- `Ajax`的原理简单来说是在用户和服务器之间加了—个中间层(`AJAX`引擎)，通过**`XmlHttpRequest`**对象来向服务器发异步请求，从服务器获得数据，然后用`javascrip`t 来操作`DOM`而更新页面。使用户操作与服务器响应异步化。这其中最关键的一步就是从服务器获得请求数据
- `Ajax`的过程只涉及`JavaScript`、`XMLHttpRequest`和`DOM`。`XMLHttpRequest`是`ajax` 的核心机制

```javascript
/** 1. 创建连接 **/
var xhr = null;
xhr = new XMLHttpRequest();
/** 2. 连接服务器 **/
xhr.open("get", url, true);
/** 3. 发送请求 **/
xhr.send(null);
/** 4. 接受请求 **/
xhr.onreadystatechange = function () {
	if (xhr.readyState == 4) {
		if (xhr.status == 200) {
			success(xhr.responseText);
		} else {
			/** false **/
			fail && fail(xhr.status);
		}
	}
};
```

**有那些优缺点?**

- 优点：
  - 通过异步模式，提升了用户体验.
  - 优化了浏览器和服务器之间的传输，减少不必要的数据往返，减少了带宽占用.
  - `Ajax`在客户端运行，承担了一部分本来由服务器承担的工作，减少了大用户量下的服务器负载。
  - `Ajax`可以实现动态不刷新（局部刷新）
- 缺点：
  - 安全问题 `AJAX`暴露了与服务器交互的细节。
  - 对搜索引擎的支持比较弱。
  - 不容易调试。


## axios和ajax的区别：

1.区别 axios是通过promise实现对ajax技术的一种封装，就像jQuery实现ajax封装一样。 简单来说： ajax技术实现了网页的局部数据刷新，axios实现了对ajax的封装。 axios是ajax ajax不止axios。

Ajax：
Ajax 即“Asynchronous Javascript And XML”（异步 JavaScript 和 XML），是指一种创建交互式网页应用的网页开发技术。
Ajax = 异步 JavaScript 和 XML（标准通用标记语言的子集）。
Ajax 是一种用于创建快速动态网页的技术。
Ajax 是一种在无需重新加载整个网页的情况下，能够更新部分网页的技术。
通过在后台与服务器进行少量数据交换，Ajax 可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。
传统的网页（不使用 Ajax）如果需要更新内容，必须重载整个网页页面。axios：
用于浏览器和node.js的基于Promise的HTTP客户端
1. 从浏览器制作XMLHttpRequests
2. 让HTTP从node.js的请求
3. 支持Promise API
4. 拦截请求和响应
5. 转换请求和响应数据
6. 取消请求
7. 自动转换为JSON数据
8. 客户端支持防止XSRF



ajax：本身是针对MVC的编程,不符合现在前端MVVM的浪潮 基于原生的XHR开发，XHR本身的架构不清晰，已经有了fetch的替代方案 JQuery整个项目太大，单纯使用ajax却要引入整个JQuery非常的不合理（采取个性化打包的方案又不能享受CDN服务 axios： 从 node.js 创建 http 请求 支持 Promise API 客户端支持防止CSRF。

 https://segmentfault.com/a/1190000018630871

## Fetch有什么优缺点？
符合关注分离，没有将输入、输出和用事件来跟踪的状态混杂在一个对象里
更好更方便的写法
更加底层，提供的API丰富（request, response）
脱离了XHR，是ES规范里新的实现方式
1）fetchtch只对网络请求报错，对400，500都当做成功的请求，需要封装去处理
2）fetch默认不会带cookie，需要添加配置项
3）fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了量的浪费
4）fetch没有办法原生监测请求的进度，而XHR可以

[fetch发送2次请求的原因](https://blog.nowcoder.net/n/4c9fbf7fdaa44eba91d05eb626d0242d?from=nowcoder_improve#:~:text=fetch%20%E5%8F%91%E9%80%81post%20%E8%AF%B7%E6%B1%82%E7%9A%84%E6%97%B6%E5%80%99%EF%BC%8C%E6%80%BB%E6%98%AF%E5%8F%91%E9%80%812%20%E6%AC%A1%EF%BC%8C%E7%AC%AC%E4%B8%80%E6%AC%A1%E7%8A%B6%E6%80%81%E7%A0%81%E6%98%AF204%EF%BC%8C%E7%AC%AC%E4%BA%8C%E6%AC%A1%E6%89%8D%E6%88%90%E5%8A%9F%E3%80%82%20%E5%8E%9F%E5%9B%A0%E5%BE%88%E7%AE%80%E5%8D%95%EF%BC%8C%E5%9B%A0%E4%B8%BA%E4%BD%A0%E7%94%A8,fetch%20%E7%9A%84%20post%20%E8%AF%B7%E6%B1%82%E7%9A%84%E6%97%B6%E5%80%99%EF%BC%8Cfetch%20%E7%AC%AC%E4%B8%80%E6%AC%A1%E5%8F%91%E9%80%81%E4%BA%86%E4%B8%80%E4%B8%AA%20Options%E8%AF%B7%E6%B1%82%EF%BC%8C%E8%AF%A2%E9%97%AE%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E4%BF%AE%E6%94%B9%E7%9A%84%E8%AF%B7%E6%B1%82%E5%A4%B4%EF%BC%8C%E5%A6%82%E6%9E%9C%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%94%AF%E6%8C%81%EF%BC%8C%E5%88%99%E5%9C%A8%E7%AC%AC%E4%BA%8C%E6%AC%A1%E4%B8%AD%E5%8F%91%E9%80%81%E7%9C%9F%E6%AD%A3%E7%9A%84%E8%AF%B7%E6%B1%82%E3%80%82)