---
sort: 26
---

# nodejs

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。 Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型。 [1]

Node 是一个让 JavaScript 运行在服务端的开发平台，它让 JavaScript 成为与PHP、Python、Perl、Ruby 等服务端语言平起平坐的脚本语言。

Node对一些特殊用例进行优化，提供替代的API，使得V8在非浏览器环境下运行得更好。V8引擎执行Javascript的速度非常快，性能非常好。Node是一个基于Chrome JavaScript运行时建立的平台， 用于方便地搭建响应速度快、易于扩展的网络应用。Node 使用事件驱动， 非阻塞I/O 模型而得以轻量和高效，非常适合在分布式设备上运行数据密集型的实时应用。

Node.js 主要由 V8、Libuv 和第三方库组成：

- Libuv：跨平台的异步 IO 库，但它提供的功能不仅仅是 IO，还包括进程、线程、信号、定时器、进程间通信，线程池等。
- 第三方库：异步 DNS 解析（ cares ）、HTTP 解析器（旧版使用 http_parser，新版使用 llhttp）、HTTP2 解析器（ nghttp2 ）、 解压压缩库( zlib )、加密解密库( openssl )等等。
- V8：实现 JS 解析、执行和支持自定义拓展，得益于 V8 支持自定义拓展，才有了 Node.js。

![架构](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf4dd465fc8c4ebf84265af17072ec65~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)


**和Tomcat的区别**

Nodejs是一个基于Chrome V8引擎的JavaScript运行环境，一个让JavaScript运行在服务端的开发平台。而Tomcat是一个应用服务器，一个免费的开放源代码的Web应用服务器，是广泛的jsp服务器。