# 登陆方案

- Cookie + Session 登录
- Token 登录
- SSO 单点登录
- OAuth 第三方登录

https://juejin.cn/post/6933115003327217671
 
## 无感token刷新

https://www.bilibili.com/video/BV1zi421k7jG/?spm_id_from=333.1387.0.0&vd_source=13577946ef3878abe2197cc65b72005c

长短token: 
- 一个短时间的权限token，用于请求时权限鉴别
- 一个长时间过期的token, 当短期token过期后，去刷新短期token
  - 应该是一个单独的接口 
  - 无感刷新：在响应拦截其中处理即可

## [oauth2](https://gitee.com/dev-edu/frontend-oauth2)

<<< ./OAuth2.md