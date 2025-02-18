# 常见web安全及防护原理

## `sql`注入原理
  - 就是通过把`SQL`命令插入到`Web`表单递交或输入域名或页面请求的查询字符串，最终达到欺骗服务器执行恶意的SQL命令
- 总的来说有以下几点
  - 永远不要信任用户的输入，要对用户的输入进行校验，可以通过正则表达式，或限制长度，对单引号和双`"-"`进行转换等
  - 永远不要使用动态拼装SQL，可以使用参数化的`SQL`或者直接使用存储过程进行数据查询存取
  - 永远不要使用管理员权限的数据库连接，为每个应用使用单独的权限有限的数据库连接
  - 不要把机密信息明文存放，请加密或者`hash`掉密码和敏感的信息

## XSS攻击

**XSS原理及防范**

- `Xss(cross-site scripting)`攻击指的是攻击者往`Web`页面里插入恶意`html`标签或者`javascript`代码。不需要你做任何的登录认证，它会通过合法的操作（比如在 url 中输入、在评论框中 输入），向你的页面注入脚本（可能是 js、hmtl 代码块等）。
- 后果：攻击者在论坛中放一个看似安全的链接，骗取用户点击后，窃取`cookie`中的用户私密信息；或者攻击者在论坛中加一个恶意表单，当用户提交表单的时候，却把信息传送到攻击者的服务器中，而不是用户原本以为的信任站点

**XSS防范方法**

- 首先代码里对用户输入的地方和变量都需要仔细检查长度和对`”<”,”>”,”;”,”’”`等字符做过滤；其次任何内容写到页面之前都必须加以encode，避免不小心把`html tag` 弄出来。这一个层面做好，至少可以堵住超过一半的XSS 攻击
- 编码：对用户输入的数据进行 [HTML Entity](https://developer.mozilla.org/zh-CN/docs/Glossary/Entity) 编码。把字符转换成 转义字符。Encode 的作用是将$var 等一些字符进行转化，使得浏览器在最终输出结果上是一样的。
- CSP: CSP 本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截是由浏览器自己实现的。我们可以通过这种方式来尽量减少 XSS 攻击。
```js
// 只允许加载本站资源
Content-Security-Policy: default-src ‘self’
// 只允许加载 HTTPS 协议图片
Content-Security-Policy: img-src https://*
// 允许加载任何来源框架
Content-Security-Policy: child-src 'none'
```
- `HttpOnly` 类型的 Cookie 用于阻止了 JavaScript 对其的访问性而能在一定程度上缓解此类攻击。

## CSRF攻击

**什么是CSRF**

（Cross Site Request Forgery, 跨站域请求伪造）是一种网络的攻击方式，CSRF通过`伪装来自受信任用户`的请求来利用受信任的网站。与[XSS](https://link.jianshu.com?t=http://baike.baidu.com/view/50325.htm)攻击相比，CSRF攻击往往不大流行（因此对其进行防范的资源也相当稀少）和`难以防范`，所以被认为比[XSS](https://link.jianshu.com?t=http://baike.baidu.com/view/50325.htm)`更具危险性`。

![img](https://pic1.zhimg.com/80/v2-05b0dd2744a82edca44ff41da4f68698_720w.jpg)

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

**防御CSRF**

- **1 验证HTTP Referer字段**

根据 HTTP 协议，在 HTTP 头中有一个字段叫 Referer，它记录了该 HTTP 请求的来源地址。在通常情况下，访问一个安全受限页面的请求来自于同一个网站，因此，要防御 CSRF 攻击，网站只需要对于每一个转账请求验证其 Referer 值，如果是以 bank.example 开头的域名，则说明该请求是来自银行网站自己的请求，是合法的。如果 Referer 是其他网站的话，则有可能是黑客的 CSRF 攻击，拒绝该请求。

缺点：

* Referer由浏览器实现，这种方法是把安全性都依赖于第三方（即浏览器）来保障事实上；
  * 对于某些浏览器，比如`IE6 或 FF2`，目前已经有一些方法可以篡改 Referer 值。如果 网站支持`IE6 浏览器`，黑客完全可以把用户浏览器的 Referer 值设为以 bank.example 域名开头的地址，这样就可以通过验证，从而进行 CSRF 攻击。
* 即便是使用最新的浏览器，黑客无法篡改 Referer 值，这种方法仍然有问题。因为 Referer 值会记录下用户的访问来源，有些用户认为这样会侵犯到他们自己的隐私权，特别是有些组织担心 Referer 值会把组织内网中的某些信息泄露到外网中。因此，用户自己可以设置浏览器使其在发送请求时不再提供 Referer。当他们正常访问银行网站时，网站会因为请求没有 Referer 值而认为是 CSRF 攻击，拒绝合法用户的访问。
* 当将攻击页面（包含form提交）以base64编码直接付给iframe的src时，不会产生referencer字段，因此无法防御CSRF

- **2 在请求地址中添加token并验证**

CSRF 攻击之所以能够成功，是因为黑客可以完全伪造用户的请求，该请求中所有的用户验证信息都是存在于 cookie 中（真实的），因此黑客可以在不知道这些验证信息的情况下直接利用用户自己的 cookie 来通过安全验证。

这种方法要比检查 Referer 要安全一些，token 可以在用户登陆后产生并放于 session 之中，然后在每次请求时把 token 从 session 中拿出，与请求中的 token 进行比对，但这种方法的难点在于如何把 token 以参数的形式加入请求。对于 GET 请求，token 将附在请求地址之后，这样 URL 就变成 [http://url?csrftoken=tokenvalue](https://link.jianshu.com?t=http://url?csrftoken=tokenvalue)。 而对于 POST 请求来说，要在 form 的最后加上 <input type="hidden" name="csrftoken" value="tokenvalue"/>，这样就把 token 以参数的形式加入请求了。

要抵御 CSRF，关键在于在请求中放入黑客所不能伪造的信息，并且该信息不存在于 cookie 之中。可以在 HTTP 请求中以参数的形式加入一个随机产生的 token，并在服务器端建立一个拦截器来验证这个 token，如果请求中没有 token 或者 token 内容不正确，则认为可能是 CSRF 攻击而拒绝该请求。

问题：对于网站中的各种请求，如何都添加上token

博客类网站，黑客发表了一个网址，如何保证跳转后的安全？

像知乎等会进行提示

- **3 在HTTP头中自定义属性并验证**

这种方法也是使用 token 并进行验证，和上一种方法不同的是，这里并不是把 token 以参数的形式置于 HTTP 请求之中，而是把它放到 HTTP 头中自定义的属性里。通过 XMLHttpRequest 这个类，可以一次性给所有该类请求加上 csrftoken 这个 HTTP 头属性，并把 token 值放入其中。这样解决了上种方法在请求中加入 token 的不便，同时，通过 XMLHttpRequest 请求的地址不会被记录到浏览器的地址栏，也不用担心 token 会透过 Referer 泄露到其他网站中去。
 然而这种方法的局限性非常大。XMLHttpRequest 请求通常用于 Ajax 方法中对于页面局部的异步刷新，并非所有的请求都适合用这个类来发起，而且通过该类请求得到的页面不能被浏览器所记录下，从而进行前进，后退，刷新，收藏等操作，给用户带来不便。另外，对于没有进行 CSRF 防护的遗留系统来说，要采用这种方法来进行防护，要把所有请求都改为 XMLHttpRequest 请求，这样几乎是要重写整个网站，这代价无疑是不能接受的。

- **4 设置SameSite**

  - SameSite=Strict：

严格模式，表明这个 cookie 在任何情况下都不可能作为第三方 cookie，绝无例外。比如说假如 b.com 设置了如下 cookie：

```
Set-Cookie: foo=1; SameSite=Strict
Set-Cookie: bar=2
```

你在 a.com 下发起的对 b.com 的任意请求中，foo 这个 cookie 都不会被包含在 Cookie 请求头中，但 bar 会。举个实际的例子就是，假如淘宝网站用来识别用户登录与否的 cookie 被设置成了 SameSite=Strict，那么用户从百度搜索页面甚至天猫页面的链接点击进入淘宝后，淘宝都不会是登录状态，因为淘宝的服务器不会接受到那个 cookie，其它网站发起的对淘宝的任意请求都不会带上那个 cookie。

  - SameSite=Lax：

宽松模式，比 Strict 放宽了点限制：假如这个请求是我上面总结的那种同步请求（改变了当前页面或者打开了新页面）且同时是个 GET 请求（因为从语义上说 GET 是读取操作，比 POST 更安全），则这个 cookie 可以作为第三方 cookie。比如说假如 b.com 设置了如下 cookie：

```
Set-Cookie: foo=1; SameSite=Strict
Set-Cookie: bar=2; SameSite=Lax
Set-Cookie: baz=3
```

当用户从 a.com 点击链接进入 b.com 时，foo 这个 cookie 不会被包含在 Cookie 请求头中，但 bar 和 baz 会，也就是说用户在不同网站之间通过链接跳转是不受影响了。但假如这个请求是从 a.com 发起的对 b.com 的异步请求，或者页面跳转是通过表单的 post 提交触发的，则 bar 也不会发送。

  - 该用哪种模式？

该用哪种模式，要看你的需求。比如你的网站是一个少数人使用的后台管理系统，所有人的操作方式都是从自己浏览器的收藏夹里打开网址，那我看用 Strict 也无妨。如果你的网站是微博，用了 Strict 会这样：有人在某个论坛里发了帖子“快看这个微博多搞笑 http://weibo.com/111111/aaaaaa”，结果下面人都回复“打不开啊”；如果你的网站是淘宝，用了 Strict 会这样：某微商在微博上发了条消息“新百伦正品特卖5折起 https://item.taobao.com/item.htm?id=1111111”，结果点进去顾客买不了，也就是说，这种超多用户的、可能经常需要用户从别的网站点过来的网站，就不适合用 Strict 了。

假如你的网站有用 iframe 形式嵌在别的网站里的需求，那么连 Lax 你也不能用，因为 iframe 请求也是一种异步请求。或者假如别的网站有使用你的网站的 JSONP 接口，那么同样 Lax 你也不能用，比如天猫就是通过淘宝的 JSONP 接口来判断用户是否登录的。

有时安全性和灵活性就是矛盾的，需要取舍。

## 中间人攻击（MITM, man in the middle）

中间人攻击是攻击方同时与服务端和客户端建立起了连接，并让对方认为连接是安全的，但是实际上整个通信过程都被攻击者控制了。攻击者不仅能获得双方的通信信息，还能修改通信信息。通常来说不建议使用公共的 Wi-Fi，因为很可能就会发生中间人攻击的情况。如果你在通信的过程中涉及到了某些敏感信息，就完全暴露给攻击方了。

当然防御中间人攻击其实并不难，只需要增加一个安全通道来传输信息。HTTPS 就可以用来防御中间人攻击，但是并不是说使用了 HTTPS 就可以高枕无忧了，因为如果你没有完全关闭 HTTP 访问的话，攻击方可以通过某些方式将 HTTPS 降级为 HTTP 从而实现中间人攻击。
## 点击劫持

点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。

**防御**

`X-FRAME-OPTIONS`: 
- `DENY`，表示页面不允许通过 iframe 的方式展示
- `SAMEORIGIN`，表示页面可以在相同域名下通过 iframe 的方式展示
- `ALLOW-FROM`，表示页面可以在指定来源的 iframe 中展示

```html
<head>
  <style id="click-jack">
    html {
      display: none !important;
    }
  </style>
</head>
<body>
  <script>
    // js主动判断当前页面是否处于iframe中，如果是禁止显示
    if (self == top) {
      var style = document.getElementById('click-jack')
      document.body.removeChild(style)
    } else {
      top.location = self.location
    }
  </script>
</body>

```


## DOS和DDOS
1）DOS攻击侧重于通过对服务器特定的漏洞，利用DOS攻击导致网络连接失败、系统崩溃、电脑死机等情况的发生。
2）DDOS攻击则通过很多“僵尸主机”向目标主机发送大量“看似”合法的流量包，从而造成网络阻塞或服务器资源耗尽而导致拒绝服务。
例如TCP首包丢弃方案，防护：
1.限制请求
2 限制连接的数量
3.增加内存
4。分布式集群防御：这是目前网络安全界防御大规模DDOS攻击的最有效方法
5。买云盾 例如阿里高防，百度云加速 电信的云提
7


# 安全相关响应头

参考：https://blog.csdn.net/qq_37788558/article/details/105460837

`X-Frame-Options`是为了减少点击劫持（Clickjacking, 即防止被其他页面iframe引用）而引入的一个响应头。
- `DENY`：不允许被任何页面嵌入；
- `SAMEORIGIN`：不允许被本域以外的页面嵌入；
- `ALLOW-FROM uri`：不允许被指定的域名以外的页面嵌入（Chrome现阶段不支持）；

`X-XSS-Protection`这个响应头是用来防范XSS的
- 0：禁用XSS保护；
- 1：启用XSS保护；启用XSS保护，并在检查到XSS攻击时，停止渲染页面（例如IE8中，检查到攻击时，整个页面会被一个#替换）；

`X-Content-Type-Options: nosniff`这个响应头的值只能是 nosniff，可用于IE8+和Chrome。另外，它还被Chrome用于扩展下载，通过下面这个响应头可以禁用

**浏览器的类型猜测行为**：
互联网上的资源有各种类型，通常浏览器会根据响应头的 Content-Type 字段来分辨它们的类型。
例如：text/html 代表html文档，image/png是PNG图片，text/css是CSS样式文档。
然而，有些资源的 Content-Type 是错的或者未定义。这时，某些浏览器会启用 MIME-sniffing 来猜测该资源的类型，解析内容并执行。
例如，我们即使给一个html文档指定Content-Type为text/plain，在IE8-中这个文档依然会被当做html来解析。利用浏览器的这个特性，攻击者甚至可以让原本应该解析为图片的请求被解析为JavaScript。

`Strict-Transport-Security`HTTP Strict Transport Security，简称为 HSTS 。它允许一个HTTPS网站，要求浏览器总是通过HTTPS来访问它。我们知道HTTPS相对于HTTP有更好的安全性，而很多HTTPS网站，也可以通过HTTP来访问。开发人员的失误或者用户主动输入地址，都有可能导致用户以HTTP访问网站，降低了安全性。一般，我们会通过Web Server发送301/302重定向来解决这个问题。
现在有了HSTS，可以让浏览器帮你做这个跳转，省一次HTTP请求。另外，浏览器本地替换可以保证只会发送HTTPS请求，避免被劫持。

`X-Content-Security-Policy`
- Content Security Policy，简称 CSP。这个规范与内容安全有关，主要是用来定义页面可以加载哪些资源，减少 XSS 的发生。