---
sort: 44
---

# https

**http和https的区别是什么呢？**
- HTTPS和HTTP都是数据传输的应用层协议，区别在于HTTPS比HTTP安全

参考：https://www.runoob.com/w3cnote/http-vs-https.html

- HTTP 明文传输，数据都是未加密的，安全性较差，HTTPS（SSL+HTTP） 数据传输过程是加密的，安全性较好。使用 HTTPS 协议需要到 CA（Certificate Authority，数字证书认证机构） 申请证书，一般免费证书较少，因而需要一定费用。。
- HTTP 页面响应速度比 HTTPS 快，主要是因为 HTTP 使用 TCP 三次握手建立连接，客户端和服务器需要交换 3 个包，而 HTTPS除了 TCP 的三个包，还要加上 ssl 握手需要的 9 个包，所以一共是 12 个包。
- http 和 https 端口也不一样，前者是 80，后者是 443。
- HTTPS 其实就是建构在 SSL/TLS 之上的 HTTP 协议，所以，要比较 HTTPS 比 HTTP 要更耗费服务器资源

**内部的加密协议**
![连接过程](https://www.runoob.com/wp-content/uploads/2018/09/https-intro.png)

TLS/SSL的功能实现主要依赖于三类基本算法：
- 利用非对称加密实现身份认证和密钥协商;
- 对称加密算法采用协商的密钥对数据加密
- 基于散列函数验证信息的完整性。

1、对称加密中加密和解密使用的秘钥是同一个；非对称加密中采用两个密钥，一般使用公钥进行加密，私钥进行解密。
2、对称加密解密的速度比较快，非对称加密和解密花费的时间长、速度相对较慢。
3、对称加密的安全性相对较低，非对称加密的安全性较高。