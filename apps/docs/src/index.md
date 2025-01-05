# 成为一名六边形现代前端

[现代前端开发必知系列](https://front-talk.com/video)

## 计算机网络

### DNS
DNS（domain name system）是一种协议，用来解析域名到IP的映射关系

除了部署在互联网的各个角落，其实每台设备都会内置本地DNS服务器

DNS查询顺序：
应用程序（如浏览器） ==  本地hosts文件 == 本地DNS服务器、根服务器、顶级域名服务器、权威服务器

从服务商购买顶级域名，同时服务商提供域名解析服务：
- A记录：保存最终要返回的IP地址
  - A记录中直接填写Ip仅适合简单应用的单机部署
  - 对于大型分布式应用，ip地址是动态变化的，因此采用动态解析ip的方式（根据网络环境地区等）
  - 这些ip对应的服务器也并非应用服务器，而是具备反向代理能力的负载均衡服务器、web防火墙等
  - 真正的web应用服务器是不会暴露在公网环境的
- CNAME记录；将子域名映射到另一个域名

现代DNS
- 安全插件
- DNS分析
- 边缘网络加速解析
- DDos防护

> 使用nslookup工具查看实际使用的CDN

内容分发网络 CDN?
当全球不同地区的用户从不同的CDN节点下载数据时，DNS会根据地区返回不同的CNAME域名（CDN加速域名）

- DNS只是用于域名查询吗
- 如何为网站绑定一个域名
- 为什么首次打开网站比较慢
- CDN是如何利用DNS加速静态资源的


```html
<!--指明浏览器需要提前解析的域名 -->
<link rel="dns-prefetch" href="//cdn.example.com"
```

通过修改本地hosts方式来给本地项目配置一个伪域名，有效解决本地开发跨域导致cookie无法传输的问题

http
-  原始http在更复杂的高并发场景下，会不够高效和稳定，因此大型基建通常会设计一层无线网关（gateway）,并对http协议进行定制，增加登录验证、请求跟踪、监控、限流等功能
- 前端代码通过远程调用（RPC）的方式而非直接使用http
- 定制化的http协议带来更强大的功能

以bilibili为例，前端发起一个grpc请求至gateway网关，同时发送了多个自定义请求头

响应中 content-type: application/grpc; 表明这是一个grpc请求

## 编程语言

- js和ecma script规范
- typescript
- 基于rust的前端基建
- webassembly (WASM)
- 领域特定语言（DSL）: jsx\template
- js引擎和js运行时（node\chrome）

## 前端工具链

构建工具组成：
- 代码转义器（Transpiler/Compiler）
  - 将源代码转换为目标平台能够运行的代码同时兼容旧环境
- 优化器
  - 压缩、混淆、分割
- 打包器（bundler）
  - 通常内置转义器和优化器，从源代码到最终产物一站式完成
- 开发服务器
  - 通过HMR、传输原生ES模块、接口代理等来提升开发体验
- 插件系统
  - 功能拓展
  - 定制化需求

大趋势
- 极致整合：将webpack内各种配置内置
- 使用rust重写核心模块：显著提升构建和打包效率

调试工具：
- 浏览器开发者工具
- 小程序开发者工具：用于小程序模拟和真机调试
- 接口调试：Postman\Apifox
- 框架调试工具: React Developer 和 Vue Devtools等 

CI/CD：
- github actions
- jenkins

## 用户界面（UI, user interface）

组件库：基础组件 模板组件 业务组件 

### 应用框架

- React生态
  - nextjs
  - umijs
  - modernjs
- Vue生态
  - Nuxt
  - Quasar
- 桌面应用
  - electron
  - tauri
- 小程序
  - uniapp
  - taro
- 移动原生应用
  - RN
  - Flutter

一般都要包含以下部分
- 路由 Routing
- 样式 styling
- 数据获取 Data Fetching
- 测试 testing
- 插件 plugin
- 部署 deploying

### 应用架构

- MPA 多页应用
- SPA 单页应用
- PWA 渐进式Web应用
  - service worker
  - 离线缓存技术
- Micro Frontends 微前端
- islands
  - 类似为前端
  - 组件细粒度拆分

# 用户体验

## 性能问题
- 页面加载事件过长
  - 资源体积过大
    - 减小产物大小
      - 压缩
      - tree shaking
      - 依赖外置
    - 减小传输量
      - 代码拆分 code spliting
      - 按需加载 lazy loading
    - 其它：
      - 服务端渲染
      - 流式渲染
      - 静态生成
  - 网络延迟高
    - http2
    - CDN
    - 边缘计算
    - 浏览器资源提示：preload\prefetch\dns-prefetch\preconnect\...
    - 图片优化：webp\预渲染缩略图
  - 缺少缓存
    - 本地缓存
      - http缓存头
      - web storage api手动管理缓存
      - service worker cache api
    - 远端缓存
      - 内存缓存
      - 边缘缓存
      - 网关缓存
  - 渲染受阻
    - js: async\defer
    - web worker \ webassembly 将耗时任务分离
    - 对于spa可在主文档预先写入数据
- 交互过程不流畅
  - 海量数据：
    - 长列表：分页、虚拟滚动
    - 大数据可视化：数据抽样、分片渲染、canvas渲染、webgl加速
    - 离屏渲染，在不见位置渲染，结束后一次性展示
  - 大量动画
    - 使用硬件加速的css属性：transform、opacity、perspective、filter等
    - requestAnimationFrame
    - 开源动画方案: Lottie, FrameMotion
  - 频繁交互
    - js: 防抖节流
    - 框架：v-show keep-alive  /  
- 资源消耗过度
  - 不合理的资源加载
  - 代码质量问题
   - 之间听不卸载的事件处理器
   - 频繁的网络请求
   - 。。。

## UI设计
- 加载反馈：loading  骨架
- 错误反馈
- 响应式设计

可访问性：
- 多语言支持： vue-il8n react-i18n

个性化：
- 主题设置
- 记忆：利用本地存储优化交互
- AB测试，针对用户进行个性化优化


# 服务端

## 运行时

js引擎 + js标准库 + 一套api

如：nodejs\deno\bun

## 基础框架

express koa fastify

## 应用框架

nestjs  eggjs

## 应用架构

MVC: 模型 视图  控制器
RESTful: 以资源和动作为核心、语义化
BFF: 面向前端的中夹层

# 质量安全

## 编码质量
- 防御性编程
- 质量管理工具：eslint静态检查 prettier风格控制
- 代码评审：代码设计问题
- 测试：
  - 单元测试：通常对实现某一功能的函数进行测试
    - jest\mocha
  - 集成测试：模块间测试
    - playwright
  - 兼容性测试
    - 特性探针 Modernizr 验证生产环境中某个特性是否可用，配合前端监控日志提前发现问题
  - UI测试：
    - VueTestUtils
    - ReactTestingLibrary

## 前端攻防

xss: sanitizeHtml对用户输入进行过滤

csrf

## 稳定性

# CI/CD

# 云基础设施加速前端

- 网络服务
- 计算服务：serverless
- 存储服务：对象存储OSS\CDN
  - CDN加速就是将构建产物上传oss再通过cdn分发
  - 图片处理：自动压缩、格式转换、添加水印
  - kv存储服务，不再需要配置后台
- 安全服务

# 可观测性

sentry

日志：前端监控手机异常信息、埋点收集用户信息

追踪: 生成和传递一个trace ID, 

度量：访问量、留存率、用户体验...
