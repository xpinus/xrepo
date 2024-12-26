---
sort: 43
---

# cookies
**什么是cookie，有什么用**

HTTP Cookie（也叫 Web Cookie 或浏览器 Cookie）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上（*这意味着是会被保存在本地的*）。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie 使基于[无状态](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview#http_is_stateless_but_not_sessionless)的 HTTP 协议记录稳定的状态信息成为了可能。

Cookie 主要用于以下三个方面：

- 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）、

Cookie 曾一度用于客户端数据的存储，因当时并没有其它合适的存储办法而作为唯一的存储手段，但现在随着现代浏览器开始支持各种各样的存储方式，Cookie 渐渐被淘汰。由于服务器指定 Cookie 后，浏览器的每次请求都会携带 Cookie 数据，会带来额外的性能开销（尤其是在移动环境下）。新的浏览器 API 已经允许开发者直接将数据存储到本地，如使用 [Web storage API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API) （本地存储和会话存储）或 [IndexedDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API) 。

| **参数**        | **描述**                                                     |
| --------------- | ------------------------------------------------------------ |
| Name            | cookie的名称，一旦创建，不可更改                             |
| Value           | cookie的值，若值为Unicode字符，需要为字符编码。若值为二进制数据，需要使用BASE64编码 |
| Domain          | 可以访问cookie的域名。如设置为。liu.com，以liu.com结尾的域名都可以访问这个cookie |
| Path            | cookie的使用路径，设置为/，则本禹铭下所有页面都可以访问这个cookie. |
| Expires/Max-Age | 有效时间                                                     |
| Size            | cookie的大小                                                 |
| HttpOnly        | 若此属性为true,则只会在HTTP头中有这个Cookie的信息，不能通过document.cookie来访问它 |
| Secure          | 指定cookie是否仅被使用安全协议传输，默认为false              |
| SameSite        | 用来限制第三方cookie,减少安全风险(防止CSRF攻击（CSRF攻击是：cookie存储用户的身份信息，恶意网站设法伪造带有正确cookie的HTTP请求）) |



**创建cookie**

当服务器收到 HTTP 请求时，服务器可以在响应头里面添加一个 [`Set-Cookie`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie) 选项。浏览器收到响应后通常会保存下 Cookie，之后对该服务器每一次请求中都通过 [`Cookie`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cookie) 请求头部将 Cookie 信息发送给服务器。另外，Cookie 的过期时间、域、路径、有效期、适用站点都可以根据需要来指定。

![img](https://pic4.zhimg.com/80/v2-b9637047c96bb6ac934807a820dc7663_720w.jpg)