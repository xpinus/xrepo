---
sort: 10
---

# SSR

![csr和ssr](https://pic2.zhimg.com/80/v2-f0fd4c14a4dd3d1a406eb7969318b651_720w.webp)

**CSR缺点**
- 首屏白屏问题，csr需要浏览器加载js代码，再执行js代码生成html元素，这一加载再执行耗时成本较高，导致首页加载会有短暂的白屏出现 
- seo(search enginee optimization 搜索引擎优化)问题，客户端加载的是一些js文件，而大部分的搜索引擎spider只认识html文件内容，对js无感。

**实现react的ssr**

1. renderToString 渲染页面
2. React.hybird 同构绑定事件
3. 实现getServerSideProps，匹配前端路由，请求数据 -- 注水脱水

https://segmentfault.com/a/1190000041170750


参见面经实践