# 登陆方案

- Cookie + Session 登录
- Token 登录
- SSO 单点登录
- OAuth 第三方登录

https://juejin.cn/post/6933115003327217671

> 用户在输入密码进行登陆后，如何安全的保持登录状态，且这个登陆状态会在一定时间后失效

`cookie` `token` `jwt`

用户在登陆后，后端进行密码校验之后，一般会返回一串加密后的字符串用来表明用户已经登录成功

## cookie和session

### 只用cookie不行吗

cookie的基本概念不做赘述，因为其可以被服务端设置而且每次会自动携带，看起来很方便，但[CSRF]([个人博客 (xueyunfeng.top)](http://blog.xueyunfeng.top/articles/16))会教你做人，一旦遭受CSRF攻击，你的用户登录信息就是拱手让人了。因此不能然服务端去校验cookie中的登录信息，很不安全。

一般来说更倾向于，手动添加一个头部header：

`Authorization: Bearer jwt令牌 `

token信息要保证经过加密，[jwt](https://www.npmjs.com/package/jwt)就是一个安全可靠的用来生成token和解析token的工具，服务端安装相应的包就可以方便的使用。

### 为什么不用session

session是维护在服务端的，按理来说用户登陆后将相应的登录信息保存，有请求的时候进行验证就行。但session保存在服务端，当面对分布式的场景时，多个机器、集群之间session信息如何沟通是个问题，因为负载均衡，指不定用户的请求会被打到哪台机器上，而jwt的安全性有保障，用它就行了

**问题**
我给后端egg设置一个中间件，所有非登录操作的都要验证token，对于中台系统来说没问题，但对于前台(我只做了一个后端，想着都用一个)目前来说不打算做登录之类的权限操作，是没有token的

* 想着通过host字段来判断？
  * 只有host对应青云时才验证，❌，有人直接有你的url，不用平台，那不就随便改？
  * 只有host对应前台host时才不验证，❌，host可以伪造，refer也差不多，老版本浏览器也可以伪造
* 目前好像只能单独再写几个路由，给前台专用，通过url路径判断是否要进行token验证

### jwt
> Json Web Token，本质是一个字符串
> 在web环境提供统一的、安全的令牌格式
> 只是一种令牌格式，既可以存储在cookie也可以存储到localstorage

#### 组成
- header: 用来描述令牌的类型，算法等
- payload: 用来存储用户信息，过期时间等
- signature: 用来校验payload的完整性，防止被篡改，需要密钥加密

## 无感token刷新

https://www.bilibili.com/video/BV1zi421k7jG/?spm_id_from=333.1387.0.0&vd_source=13577946ef3878abe2197cc65b72005c

长短token: 
- 一个短时间的权限token，用于请求时权限鉴别
- 一个长时间过期的token, 当短期token过期后，去刷新短期token
  - 应该是一个单独的接口 
  - 无感刷新：在响应拦截其中处理即可

## [oauth2](https://gitee.com/dev-edu/frontend-oauth2)

<<< ./OAuth2.md