import{a2 as i,t as a,ao as n,q as l}from"./chunks/framework.tQiMsDJj.js";const o=JSON.parse('{"title":"登陆方案","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/场景应用/前端登录方案/index.md","filePath":"knowledge-lib/js/场景应用/前端登录方案/index.md"}'),t={name:"knowledge-lib/js/场景应用/前端登录方案/index.md"};function h(k,s,p,e,E,r){return l(),a("div",null,s[0]||(s[0]=[n(`<h1 id="登陆方案" tabindex="-1">登陆方案 <a class="header-anchor" href="#登陆方案" aria-label="Permalink to &quot;登陆方案&quot;">​</a></h1><ul><li>Cookie + Session 登录</li><li>Token 登录</li><li>SSO 单点登录</li><li>OAuth 第三方登录</li></ul><p><a href="https://juejin.cn/post/6933115003327217671" target="_blank" rel="noreferrer">https://juejin.cn/post/6933115003327217671</a></p><blockquote><p>用户在输入密码进行登陆后，如何安全的保持登录状态，且这个登陆状态会在一定时间后失效</p></blockquote><p><code>cookie</code> <code>token</code> <code>jwt</code></p><p>用户在登陆后，后端进行密码校验之后，一般会返回一串加密后的字符串用来表明用户已经登录成功</p><h2 id="cookie和session" tabindex="-1">cookie和session <a class="header-anchor" href="#cookie和session" aria-label="Permalink to &quot;cookie和session&quot;">​</a></h2><h3 id="只用cookie不行吗" tabindex="-1">只用cookie不行吗 <a class="header-anchor" href="#只用cookie不行吗" aria-label="Permalink to &quot;只用cookie不行吗&quot;">​</a></h3><p>cookie的基本概念不做赘述，因为其可以被服务端设置而且每次会自动携带，看起来很方便，但[CSRF](<a href="http://blog.xueyunfeng.top/articles/16" target="_blank" rel="noreferrer">个人博客 (xueyunfeng.top)</a>)会教你做人，一旦遭受CSRF攻击，你的用户登录信息就是拱手让人了。因此不能然服务端去校验cookie中的登录信息，很不安全。</p><p>一般来说更倾向于，手动添加一个头部header：</p><p><code>Authorization: Bearer jwt令牌 </code></p><p>token信息要保证经过加密，<a href="https://www.npmjs.com/package/jwt" target="_blank" rel="noreferrer">jwt</a>就是一个安全可靠的用来生成token和解析token的工具，服务端安装相应的包就可以方便的使用。</p><h3 id="为什么不用session" tabindex="-1">为什么不用session <a class="header-anchor" href="#为什么不用session" aria-label="Permalink to &quot;为什么不用session&quot;">​</a></h3><p>session是维护在服务端的，按理来说用户登陆后将相应的登录信息保存，有请求的时候进行验证就行。但session保存在服务端，当面对分布式的场景时，多个机器、集群之间session信息如何沟通是个问题，因为负载均衡，指不定用户的请求会被打到哪台机器上，而jwt的安全性有保障，用它就行了</p><p><strong>问题</strong> 我给后端egg设置一个中间件，所有非登录操作的都要验证token，对于中台系统来说没问题，但对于前台(我只做了一个后端，想着都用一个)目前来说不打算做登录之类的权限操作，是没有token的</p><ul><li>想着通过host字段来判断？ <ul><li>只有host对应青云时才验证，❌，有人直接有你的url，不用平台，那不就随便改？</li><li>只有host对应前台host时才不验证，❌，host可以伪造，refer也差不多，老版本浏览器也可以伪造</li></ul></li><li>目前好像只能单独再写几个路由，给前台专用，通过url路径判断是否要进行token验证</li></ul><h3 id="jwt" tabindex="-1">jwt <a class="header-anchor" href="#jwt" aria-label="Permalink to &quot;jwt&quot;">​</a></h3><blockquote><p>Json Web Token，本质是一个字符串 在web环境提供统一的、安全的令牌格式 只是一种令牌格式，既可以存储在cookie也可以存储到localstorage</p></blockquote><h4 id="组成" tabindex="-1">组成 <a class="header-anchor" href="#组成" aria-label="Permalink to &quot;组成&quot;">​</a></h4><ul><li>header: 用来描述令牌的类型，算法等</li><li>payload: 用来存储用户信息，过期时间等</li><li>signature: 用来校验payload的完整性，防止被篡改，需要密钥加密</li></ul><h2 id="无感token刷新" tabindex="-1">无感token刷新 <a class="header-anchor" href="#无感token刷新" aria-label="Permalink to &quot;无感token刷新&quot;">​</a></h2><p><a href="https://www.bilibili.com/video/BV1zi421k7jG/?spm_id_from=333.1387.0.0&amp;vd_source=13577946ef3878abe2197cc65b72005c" target="_blank" rel="noreferrer">https://www.bilibili.com/video/BV1zi421k7jG/?spm_id_from=333.1387.0.0&amp;vd_source=13577946ef3878abe2197cc65b72005c</a></p><p>长短token:</p><ul><li>一个短时间的权限token，用于请求时权限鉴别</li><li>一个长时间过期的token, 当短期token过期后，去刷新短期token <ul><li>应该是一个单独的接口</li><li>无感刷新：在响应拦截其中处理即可</li></ul></li></ul><h2 id="oauth2" tabindex="-1"><a href="https://gitee.com/dev-edu/frontend-oauth2" target="_blank" rel="noreferrer">oauth2</a> <a class="header-anchor" href="#oauth2" aria-label="Permalink to &quot;[oauth2](https://gitee.com/dev-edu/frontend-oauth2)&quot;">​</a></h2><div class="language-md vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">md</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;"># OAuth2.0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## 认识OAuth2.0</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; [</span><span style="--shiki-light:#032F62;--shiki-light-text-decoration:underline;--shiki-dark:#DBEDFF;--shiki-dark-text-decoration:underline;">OAuth</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">](</span><span style="--shiki-light:#22863A;--shiki-light-text-decoration:underline;--shiki-dark:#85E89D;--shiki-dark-text-decoration:underline;">http://en.wikipedia.org/wiki/OAuth</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">)是一个关于授权（authorization）的开放网络标准协议，简单理解就是一种授权机制。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 授权机制设计</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">![](</span><span style="--shiki-light:#24292E;--shiki-light-text-decoration:underline;--shiki-dark:#E1E4E8;--shiki-dark-text-decoration:underline;">./asset/OAuth2.png</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; </span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**OAuth 就是一种授权机制。数据的所有者告诉系统，同意授权第三方应用进入系统，获取这些数据。系统从而产生一个短期的进入令牌（token），用来代替密码，供第三方应用使用**</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; 令牌既可以让第三方应用获得权限，同时又随时可控，不会危及系统安全。这也是 OAuth 2.0 的优点。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">令牌的特点</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 短期的，到期会自动失效，用户自己无法修改。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 可以被数据所有者撤销，会立即失效。</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 有权限范围（scope），对于网络服务来说，只读令牌就比读写令牌更安全。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 获取令牌四种实现方式</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 授权码（authorization-code）</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 隐藏式（implicit）</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 密码式（password）：</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 客户端凭证（client credentials）</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; 不管哪一种授权方式，第三方应用申请令牌之前，</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**都必须先到系统备案**</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">，说明自己的身份，然后会拿到两个身份识别码：</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**客户端 ID（client ID）和客户端密钥（client secret）**</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">。这是为了防止令牌被滥用，没有备案过的第三方应用，是不会拿到令牌的；</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">#### 授权码</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**授权码（authorization code）方式，指的是第三方应用先申请一个授权码，然后再用该码获取令牌（适合前后端分离，最常用的方式）。**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; 这种方式是最常用的流程，安全性也最高，它适用于有后端的 Web 应用。授权码通过前端传送，令牌则是储存在后端，而且所有与资源服务器的通信都在后端完成。这样的前后端分离，可以避免令牌泄漏。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;"> **A 网站提供一个链接，用户点击后就会跳转到 B 网站，授权用户数据给 A 网站使用。**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   \`\`\`javascript</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   https</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//b.com/oauth/authorize?</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     response_type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">code</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     client_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CLIENT_ID</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     redirect_uri</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CALLBACK_URL</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     scope</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">read</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   \`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> response_type=code     </span><span style="--shiki-light:#24292E;--shiki-light-font-style:italic;--shiki-dark:#E1E4E8;--shiki-dark-font-style:italic;">*code参数表示要求返回授权码*</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> client_id=CLIENT_ID     </span><span style="--shiki-light:#24292E;--shiki-light-font-style:italic;--shiki-dark:#E1E4E8;--shiki-dark-font-style:italic;">*参数让B知道是谁在请求数据*</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> redirect_uri = CALLBACK_URL   </span><span style="--shiki-light:#24292E;--shiki-light-font-style:italic;--shiki-dark:#E1E4E8;--shiki-dark-font-style:italic;">*当B网站处理完成链接请求后的跳转地址*</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">    -</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> scope=read     </span><span style="--shiki-light:#24292E;--shiki-light-font-style:italic;--shiki-dark:#E1E4E8;--shiki-dark-font-style:italic;">*表示要授权的范围，read代表对授权资源进行只读操作*</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;"> **跳转成功，B 网站会要求用户登录，然后询问是否同意给予 A 网站授权。用户表示同意，这时 B 网站就会跳回</span><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">\`redirect_uri\`</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">参数指定的网址。跳转时，会传回一个授权码**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   \`\`\`js</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   https</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//a.com/callback?code=AUTHORIZATION_CODE     // code 代表授权码</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   \`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">3.</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;"> **A 网站拿到授权码以后，就可以在后端，向 B 网站请求令牌。**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`html</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">https://b.com/oauth/token?</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> client_id=CLIENT_ID&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> client_secret=CLIENT_SECRET&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> grant_type=authorization_code&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> code=AUTHORIZATION_CODE&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> redirect_uri=CALLBACK_URL</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> client_id   </span><span style="--shiki-light:#24292E;--shiki-light-font-style:italic;--shiki-dark:#E1E4E8;--shiki-dark-font-style:italic;">*确认A的身份*</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> client_secret   </span><span style="--shiki-light:#24292E;--shiki-light-font-style:italic;--shiki-dark:#E1E4E8;--shiki-dark-font-style:italic;">*确认A的身份*</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> grant_type		</span><span style="--shiki-light:#24292E;--shiki-light-font-style:italic;--shiki-dark:#E1E4E8;--shiki-dark-font-style:italic;">*表示使用授权的方式获取授权码*</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> code 				</span><span style="--shiki-light:#24292E;--shiki-light-font-style:italic;--shiki-dark:#E1E4E8;--shiki-dark-font-style:italic;">*第二步中获取到的code值*</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> redirect_uri      </span><span style="--shiki-light:#24292E;--shiki-light-font-style:italic;--shiki-dark:#E1E4E8;--shiki-dark-font-style:italic;">*令牌颁发后的回调地址*</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">4.</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;"> **B 网站收到请求以后，就会颁发令牌。具体做法是向</span><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">\`redirect_uri\`</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">指定的网址，发送一段 JSON 数据。**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`javascript</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{    </span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;access_token&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;ACCESS_TOKEN&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;token_type&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;bearer&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;expires_in&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2592000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;refresh_token&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;REFRESH_TOKEN&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;scope&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;read&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;uid&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">100101</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;info&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:{</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">...</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">#### 隐藏式</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; 适用于纯前端的WEB应用，必须将令牌储存在前端。允许直接向前端颁发令牌。这种方式没有授权码这个中间步骤，所以称为（授权码）&quot;隐藏式&quot;（implicit）。</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**由于前端直接获取token，安全性较低，一般适用于比较信任的网站，并且令牌的有效期，也相对较短，一般是界面关闭及失效**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;"> **A 网站提供一个链接，要求用户跳转到 B 网站，授权用户数据给 A 网站使用**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   \`\`\`html</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   https://b.com/oauth/authorize?</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     response_type=token&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     client_id=CLIENT_ID&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     redirect_uri=CALLBACK_URL&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">     scope=read</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   \`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">   &gt; response_type=token  表示直接返回令牌</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;"> **用户跳转到 B 网站，登录后同意给予 A 网站授权。B 网站就会跳回</span><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">\`redirect_uri\`</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">参数指定的跳转网址，并且把令牌作为 URL 参数，传给 A 网站。**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`js</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">https</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//a.com/callback#token=ACCESS_TOKEN</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; token参数为令牌，</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;">**令牌的位置是 URL 锚点（fragment），而不是查询字符串（querystring），这是因为 OAuth 2.0 允许跳转网址是 HTTP 协议，因此存在&quot;中间人攻击&quot;的风险，而浏览器跳转时，锚点不会发到服务器，就减少了泄漏令牌的风险。**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">#### 密码式</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; 如果你高度信任某个应用，RFC 6749 也允许用户把用户名和密码，直接告诉该应用。该应用就使用你的密码，申请令牌，这种方式称为&quot;密码式&quot;（password）。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 第一步，A 网站要求用户提供 B 网站的用户名和密码。拿到以后，A 就直接向 B 请求令牌。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`js</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">https</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//oauth.b.com/token?</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> grant_type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">password</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> username</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">USERNAME</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> password</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">PASSWORD</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> client_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CLIENT_ID</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> grant_type = password   </span><span style="--shiki-light:#24292E;--shiki-light-font-style:italic;--shiki-dark:#E1E4E8;--shiki-dark-font-style:italic;">*授权方式为密码的形式进行授权*</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> username &amp;&amp; userpassword </span><span style="--shiki-light:#24292E;--shiki-light-font-style:italic;--shiki-dark:#E1E4E8;--shiki-dark-font-style:italic;">*B网站的登录用户名及密码*</span></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">-</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> client_id     </span><span style="--shiki-light:#24292E;--shiki-light-font-style:italic;--shiki-dark:#E1E4E8;--shiki-dark-font-style:italic;">*用户申请令牌的身份标识*</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> B 网站验证身份通过后，直接给出令牌。注意，这时不需要跳转，而是把令牌放在 JSON 数据里面，作为 HTTP 回应，A 因此拿到令牌。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; 这种方式需要用户给出自己的用户名/密码，显然风险很大，因此只适用于其他授权方式都无法采用的情况，而且必须是用户高度信任的应</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">#### 凭证式</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; 凭证式和密码式很相似，主要适用于那些没有前端的命令行应用，可以用最简单的方式获取令牌，在请求响应的 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`JSON\`</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> 结果中返回 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`token\`</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">1.</span><span style="--shiki-light:#24292E;--shiki-light-font-weight:bold;--shiki-dark:#E1E4E8;--shiki-dark-font-weight:bold;"> **第一步，A 应用在命令行向 B 发出请求。**</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`html</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">https://oauth.b.com/token?</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  grant_type=client_credentials&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  client_id=CLIENT_ID&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  client_secret=CLIENT_SECRET</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`grant_type\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 为 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`client_credentials\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 表示凭证式授权，</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`client_id\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 和 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`client_secret\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 用来识别身份。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E36209;--shiki-dark:#FFAB70;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> B 网站验证通过以后，直接返回令牌。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">### 令牌的使用/更新</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">##### 使用</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; A 网站拿到令牌以后，就可以向 B 网站的 API 请求数据了。使用方法为在请求头中将 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`token\`</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> 放在 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`http\`</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> 请求头部的一个</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`Authorization\`</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">字段里。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">##### 更新</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`token\`</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">是有时效性的，一旦过期就需要重新获取，令牌的有效期到了，如果让用户重新走一遍上面的流程，再申请一个新的令牌，很可能体验不好，而且也没有必要。OAuth 2.0 允许用户自动更新令牌</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">##### 实现方法</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">&gt; 具体方法是，B 网站颁发令牌的时候，一次性颁发两个令牌，一个用于获取数据，另一个用于获取新的令牌（refresh token 字段）。令牌到期前，用户使用 refresh token 发一个请求，去更新令牌。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`js</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">https</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//b.com/oauth/token?</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  grant_type</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">refresh_token</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  client_id</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CLIENT_ID</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  client_secret</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CLIENT_SECRET</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  refresh_token</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">REFRESH_TOKEN</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`grant_type\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">参数为</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`refresh_token\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">表示要求更新令牌；</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`client_id\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">参数和</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`client_secret\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">参数用于确认身份；</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`refresh_token\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">参数就是用于更新令牌的令牌。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">B 网站验证通过以后，就会颁发新的令牌</span></span></code></pre></div>`,26)]))}const g=i(t,[["render",h]]);export{o as __pageData,g as default};
