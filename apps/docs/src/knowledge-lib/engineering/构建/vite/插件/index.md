# 插件 API

> 本质是一个带有一系列属性、回调函数的对象

Vite 插件扩展了设计出色的 Rollup 接口，带有一些 Vite 独有的配置项。因此，你只需要编写一个 Vite 插件，就可以同时为开发环境和生产环境工作

> 约定

如果插件不使用 Vite 特有的钩子，可以作为 兼容 Rollup 的插件 来实现，推荐使用 Rollup 插件名称约定：
- 有一个带 rollup-plugin- 前缀、语义清晰的名称
- 在 package.json 中包含 rollup-plugin 和 vite-plugin 关键字

对于 Vite 专属的插件：
- 有一个带 vite-plugin- 前缀、语义清晰的名称，你的插件只适用于特定的框架，应在追加上框架名
- 在 package.json 中包含 vite-plugin 关键字

## 插件配置
- 在 `plugins` 数组中配置插件
- 假值插件（插件返回的是undeifne\null等假值不是一个配置）将被自动忽略
- 插件可以返回一个有插件构成的数组，该数组将被自动扁平化

## 钩子

### 通用钩子
> 在开发中，Vite 开发服务器会创建一个插件容器来调用 Rollup 构建钩子，与 Rollup 如出一辙

- 服务器启动时
  - `options`
  - `buildStart`
- 每个传入模块请求时
  - `resolvedId`
  - `load`
  - `transform`
- 服务器关闭时
  - `buildEnd`
  - `closeBundle`

> 请注意 `moduleParsed` 钩子在开发中是**不会**被调用的，因为 Vite 为了性能会避免完整的 AST 解析

> Output Generation Hooks（除了 closeBundle) 在开发中是 不会 被调用的。你可以认为 Vite 的开发服务器只调用了 rollup.rollup() 而没有调用 bundle.generate()。

### Vite独有钩子

- `config`：
  - `(config: UserConfig, env: { mode: string, command: string }) => UserConfig | null | void`
  - 在解析 Vite 配置前调用。
  - 钩子接收原始用户配置和配置环境的变量, command 为CLI指令
  - 用户插件在运行这个钩子之前会被解析，因此在 config 钩子中注入其他插件不会有任何效果
- `configResolved`:
  - `(config: ResolvedConfig) => void | Promise<void>`
  - **在解析 Vite 配置后调用**
  - 使用这个钩子读取和存储最终解析的配置
- `configureServer`:
  - `(server: ViteDevServer) => (() => void) | void | Promise<(() => void) | void>`
  - 用于配置开发服务器的钩子
  - 添加改变一些中间件
  - 访问存储服务器
  - 注意 configureServer 在运行生产版本时不会被调用，所以其他钩子需要防范它缺失
- `configurePreviewServer`:
  - 与 configureServer 相同但是作为预览服务器
- `transformIndexHtml`:
  - 转换 index.html 的专用钩子，钩子接收当前的 HTML 字符串和转换上下文
  - 上下文在开发期间暴露ViteDevServer实例，在构建期间暴露 Rollup 输出的包
  - 返回值
    - 经过转换的 HTML 字符串
    - 注入到现有 HTML 中的标签描述符对象数组（{ tag, attrs, children }）。每个标签也可以指定它应该被注入到哪里（默认是在 `<head>` 之前）
  - 一个包含 { html, tags } 的对象
- `handleHotUpdate`:
  - 行自定义 HMR 更新处理 

## 插件执行顺序
> 同级别会按照数组从前到后的顺序执行

> 插件可以额外指定一个 enforce 属性（类似于 webpack 加载器）来调整它的应用顺序。enforce 的值可以是pre 或 post。解析后的插件将按照以下顺序排列：

- Alias
- 带有 enforce: 'pre' 的用户插件，在 Vite 核心插件之后调用该插件
- Vite 核心插件
- 没有 enforce 值的用户插件，在 Vite 核心插件之后调用该插件
- Vite 构建用的插件
- 带有 enforce: 'post' 的用户插件，在 Vite 构建插件之后调用该插件
- Vite 后置构建插件（最小化，manifest，报告）
- 情景应用

## 插件应用情景
默认情况下插件在开发（serve）和构建（build）模式中都会调用

使用`apply`属性指明它们仅在 'build' 或 'serve' 模式时调用

apply: 'build'

## 常用插件

例如，要想为传统浏览器提供支持，可以按下面这样使用官方插件 @vitejs/plugin-legacy

## 实现“约定大于配置”的自动路由配置插件



