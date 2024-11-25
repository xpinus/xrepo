# 什么是cookie，有什么用

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



# 创建cookie

当服务器收到 HTTP 请求时，服务器可以在响应头里面添加一个 [`Set-Cookie`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie) 选项。浏览器收到响应后通常会保存下 Cookie，之后对该服务器每一次请求中都通过 [`Cookie`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cookie) 请求头部将 Cookie 信息发送给服务器。另外，Cookie 的过期时间、域、路径、有效期、适用站点都可以根据需要来指定。

![img](https://pic4.zhimg.com/80/v2-b9637047c96bb6ac934807a820dc7663_720w.jpg)





# CSRF攻击

## 什么是CSRF

（Cross Site Request Forgery, 跨站域请求伪造）是一种网络的攻击方式，它在 2007 年曾被列为互联网 20 大安全隐患之一,也被称为“One Click Attack”或者Session Riding，通常缩写为CSRF或者XSRF，是一种对网站的恶意利用。尽管听起来像跨站脚本（[XSS](https://link.jianshu.com?t=http://baike.baidu.com/view/50325.htm)），但它与XSS非常不同，并且攻击方式几乎相左。XSS利用站点内的信任用户，而CSRF则通过`伪装来自受信任用户`的请求来利用受信任的网站。与[XSS](https://link.jianshu.com?t=http://baike.baidu.com/view/50325.htm)攻击相比，CSRF攻击往往不大流行（因此对其进行防范的资源也相当稀少）和`难以防范`，所以被认为比[XSS](https://link.jianshu.com?t=http://baike.baidu.com/view/50325.htm)`更具危险性`。

![img](https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg-blog.csdnimg.cn%2Fimg_convert%2F2e1c3a03b779872af269a39c675d4a37.png&refer=http%3A%2F%2Fimg-blog.csdnimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660270922&t=c8f8e09571aa520d2a709eea400f9105)

* GET类型

  * ```html
    <img src=http://wooyun.org/csrf?xx=11 /> 
    ```

  * 在访问含有这个img的页面后，成功向`http://wooyun.org/csrf?xx=11` 发出了一次HTTP请求。所以，如果将该网址替换为存在GET型CSRF的地址，就能完成攻击了。

* POST类型

  * ```html
    <form action=http://wooyun.org/csrf.php method=POST>
    	<input type="text" name="xx" value="11" />
    </form>
    <script> document.forms[0].submit(); </script> 
    ```

  * 访问该页面后，表单会自动提交，相当于模拟用户完成了一次POST操作。

## 防御CSRF

### 1 验证HTTP Referer字段

根据 HTTP 协议，在 HTTP 头中有一个字段叫 Referer，它记录了该 HTTP 请求的来源地址。在通常情况下，访问一个安全受限页面的请求来自于同一个网站，因此，要防御 CSRF 攻击，网站只需要对于每一个转账请求验证其 Referer 值，如果是以 bank.example 开头的域名，则说明该请求是来自银行网站自己的请求，是合法的。如果 Referer 是其他网站的话，则有可能是黑客的 CSRF 攻击，拒绝该请求。

缺点：

* Referer由浏览器实现，这种方法是把安全性都依赖于第三方（即浏览器）来保障事实上；
  * 对于某些浏览器，比如`IE6 或 FF2`，目前已经有一些方法可以篡改 Referer 值。如果 网站支持`IE6 浏览器`，黑客完全可以把用户浏览器的 Referer 值设为以 bank.example 域名开头的地址，这样就可以通过验证，从而进行 CSRF 攻击。
*  即便是使用最新的浏览器，黑客无法篡改 Referer 值，这种方法仍然有问题。因为 Referer 值会记录下用户的访问来源，有些用户认为这样会侵犯到他们自己的隐私权，特别是有些组织担心 Referer 值会把组织内网中的某些信息泄露到外网中。因此，用户自己可以设置浏览器使其在发送请求时不再提供 Referer。当他们正常访问银行网站时，网站会因为请求没有 Referer 值而认为是 CSRF 攻击，拒绝合法用户的访问。

### 2 在请求地址中添加token并验证

CSRF 攻击之所以能够成功，是因为黑客可以完全伪造用户的请求，该请求中所有的用户验证信息都是存在于 cookie 中（真实的），因此黑客可以在不知道这些验证信息的情况下直接利用用户自己的 cookie 来通过安全验证。

这种方法要比检查 Referer 要安全一些，token 可以在用户登陆后产生并放于 session 之中，然后在每次请求时把 token 从 session 中拿出，与请求中的 token 进行比对，但这种方法的难点在于如何把 token 以参数的形式加入请求。对于 GET 请求，token 将附在请求地址之后，这样 URL 就变成 [http://url?csrftoken=tokenvalue](https://link.jianshu.com?t=http://url?csrftoken=tokenvalue)。 而对于 POST 请求来说，要在 form 的最后加上 <input type="hidden" name="csrftoken" value="tokenvalue"/>，这样就把 token 以参数的形式加入请求了。

要抵御 CSRF，关键在于在请求中放入黑客所不能伪造的信息，并且该信息不存在于 cookie 之中。可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。

问题：对于网站中的各种请求，如何都添加上token

博客类网站，黑客发表了一个网址，如何保证跳转后的安全？

像知乎等会进行提示

### 3 在HTTP头中自定义属性并验证

这种方法也是使用 token 并进行验证，和上一种方法不同的是，这里并不是把 token 以参数的形式置于 HTTP 请求之中，而是把它放到 HTTP 头中自定义的属性里。通过 XMLHttpRequest 这个类，可以一次性给所有该类请求加上 csrftoken 这个 HTTP 头属性，并把 token 值放入其中。这样解决了上种方法在请求中加入 token 的不便，同时，通过 XMLHttpRequest 请求的地址不会被记录到浏览器的地址栏，也不用担心 token 会透过 Referer 泄露到其他网站中去。
 然而这种方法的局限性非常大。XMLHttpRequest 请求通常用于 Ajax 方法中对于页面局部的异步刷新，并非所有的请求都适合用这个类来发起，而且通过该类请求得到的页面不能被浏览器所记录下，从而进行前进，后退，刷新，收藏等操作，给用户带来不便。另外，对于没有进行 CSRF 防护的遗留系统来说，要采用这种方法来进行防护，要把所有请求都改为 XMLHttpRequest 请求，这样几乎是要重写整个网站，这代价无疑是不能接受的。

### 4 设置SameSite

* SameSite=Strict：

严格模式，表明这个 cookie 在任何情况下都不可能作为第三方 cookie，绝无例外。比如说假如 b.com 设置了如下 cookie：

```
Set-Cookie: foo=1; SameSite=Strict
Set-Cookie: bar=2
```

你在 a.com 下发起的对 b.com 的任意请求中，foo 这个 cookie 都不会被包含在 Cookie 请求头中，但 bar 会。举个实际的例子就是，假如淘宝网站用来识别用户登录与否的 cookie 被设置成了 SameSite=Strict，那么用户从百度搜索页面甚至天猫页面的链接点击进入淘宝后，淘宝都不会是登录状态，因为淘宝的服务器不会接受到那个 cookie，其它网站发起的对淘宝的任意请求都不会带上那个 cookie。

* SameSite=Lax：

宽松模式，比 Strict 放宽了点限制：假如这个请求是我上面总结的那种同步请求（改变了当前页面或者打开了新页面）且同时是个 GET 请求（因为从语义上说 GET 是读取操作，比 POST 更安全），则这个 cookie 可以作为第三方 cookie。比如说假如 b.com 设置了如下 cookie：

```
Set-Cookie: foo=1; SameSite=Strict
Set-Cookie: bar=2; SameSite=Lax
Set-Cookie: baz=3
```

当用户从 a.com 点击链接进入 b.com 时，foo 这个 cookie 不会被包含在 Cookie 请求头中，但 bar 和 baz 会，也就是说用户在不同网站之间通过链接跳转是不受影响了。但假如这个请求是从 a.com 发起的对 b.com 的异步请求，或者页面跳转是通过表单的 post 提交触发的，则 bar 也不会发送。

* 该用哪种模式？

该用哪种模式，要看你的需求。比如你的网站是一个少数人使用的后台管理系统，所有人的操作方式都是从自己浏览器的收藏夹里打开网址，那我看用 Strict 也无妨。如果你的网站是微博，用了 Strict 会这样：有人在某个论坛里发了帖子“快看这个微博多搞笑 http://weibo.com/111111/aaaaaa”，结果下面人都回复“打不开啊”；如果你的网站是淘宝，用了 Strict 会这样：某微商在微博上发了条消息“新百伦正品特卖5折起 https://item.taobao.com/item.htm?id=1111111”，结果点进去顾客买不了，也就是说，这种超多用户的、可能经常需要用户从别的网站点过来的网站，就不适合用 Strict 了。

假如你的网站有用 iframe 形式嵌在别的网站里的需求，那么连 Lax 你也不能用，因为 iframe 请求也是一种异步请求。或者假如别的网站有使用你的网站的 JSONP 接口，那么同样 Lax 你也不能用，比如天猫就是通过淘宝的 JSONP 接口来判断用户是否登录的。

有时安全性和灵活性就是矛盾的，需要取舍。

# 登录鉴权

https://juejin.cn/post/6898630134530752520

## session

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37adb2019d064967923a659848870771~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

* 服务端只是给 cookie 一个 sessionId，而 session 的具体内容（可能包含用户信息、session 状态等），要自己存一下。存储在如redis数据库中

* 分布式问题，通常服务端都是集群：

  * 一是从「存储」角度，把 session 集中存储。如果我们用独立的 Redis 或普通数据库，就可以把 session 都存到一个库里。（通常）
  * 二是从「分布」角度，让相同 IP 的请求在负载均衡时都打到同一台机器上。以 nginx 为例，可以配置 ip_hash 来实现。


## token

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1c57a08eb204f528256f3980c721148~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

https://juejin.cn/post/6898630134530752520

里面包含许多其他问题，需要进一步研读







EGG 

sendBeacon

post请求但是bady没有内容，因为sendBeacon的content-type: text/plain 基于koa的架构都会不进行解析，EGG中可以做如下配置，即可

```
config.bodyParser = {
  enableTypes: ['json', 'form', 'text'],
  extendTypes: {
    text: ['text/xml', 'application/xml'],
  },
}
```
