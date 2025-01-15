# [Vite](https://vitejs.cn/vite3-cn/guide/)

vite主要由两部分组成：
- 一个开发服务器。基于 原生 ES 模块 提供了 丰富的内建功能，如速度快到惊人的 模块热更新（HMR）
- 一套构建指令。使用 Rollup 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源

## [Vite插件API](https://vitejs.cn/vite3-cn/guide/api-plugin.html)

## [Vite JavaScript API](https://vitejs.cn/vite3-cn/guide/api-javascript.html)

## [Vite HMR API](https://vitejs.cn/vite3-cn/guide/api-hmr.html)



- 开发环节
  1. 首先，当启动vite开发服务器时，vite会检测入口文件
  2. 当你在浏览器中访问程序时，vite将拦截对入口文件及被模块导入的文件的请求
  3. vite支持使用浏览器内置的es模块系统来加载模块，这是浏览器原生支持的一种模块加载方式，这与传统的基于打包的构建工具（如webpack）有所不同
  4. vite会运行一个开发服务器，通过代理的形式将模块请求重定向到实际的模块文件路径，不需要webpack一样先打包，再加载
  5. 当代码有修改时，vite会根据代码的依赖关系对只有发生变化的模块进行重新构建，并将变化传递给浏览器，实现热更新

- 生产环节：
  - vite会使用预编译的方式来构建应用程序
  - 根据入口文件和依赖关系，分析模块的导入关系
  - vite会为每个模块都生成单独的、按需加载的优化过的es模块，这样每个模块都可以单独缓存加载
  - 还会生成用于生产环境的最终打包文件，将所有的模块和资源文件合并并压缩

vite利用对浏览器esm的原生支持，以及按需编译和缓存的思想来提供快速的开发体验，通过减少构建和打包的时间，实现了更快的开发和热更新效果

## 功能

- NPM 依赖解析和预构建
  原生 ES 导入不支持下面这样的裸模块导入：```import { someMethod } from 'my-dep'```
  Vite 将会检测到所有被加载的源文件中的此类裸模块导入，并执行以下操作:
  - 预构建 它们可以提高页面加载速度，并将 CommonJS / UMD 转换为 ESM 格式。预构建这一步由 esbuild 执行，这使得 Vite 的冷启动时间比任何基于 JavaScript 的打包器都要快得多。
  - 重写导入为合法的 URL，例如 /node_modules/.vite/deps/my-dep.js?v=f3sf2ebd 以便浏览器能够正确导入它们。
  依赖是强缓存的, Vite 通过 HTTP 头来缓存请求得到的依赖

- 模块热替换: Vite 提供了一套原生 ESM 的 HMR API。 具有 HMR 功能的框架可以利用该 API 提供即时、准确的更新，而无需重新加载页面或清除应用程序状态。
- ts支持：
  - Vite 使用 esbuild 将 TypeScript 转译到 JavaScript
  - 仅执行 .ts 文件的转译工作，并 不 执行任何类型检查（你可以在构建脚本中运行 tsc --noEmit 或者安装 vue-tsc 然后运行 vue-tsc --noEmit 来对你的 *.vue 文件做类型检查）
- Vue
  - jsx:JSX 的转译同样是通过 esbuild,官方提供的 @vitejs/plugin-vue-jsx 插件
- CSS
  - @import内联和变基
  - PostCSS
  - CSS Module
  - CSS 预处理器
- 静态资源处理
  - 禁用 CSS 注入页面
  - JSON
  - Glob 导入:支持使用特殊的 import.meta.glob 函数从文件系统导入多个模块
  - 动态导入
  - WebAssembly: 预编译的 .wasm 文件可以通过 ?init 来导入。默认导出一个初始化函数，返回值为所导出 wasm 实例对象的 Promise
  - Web Worker
    - 一个 Web Worker 可以使用 new Worker() 和 new SharedWorker() 导入
    - 你可以在导入请求上添加 ?worker 或 ?sharedworker 查询参数来直接导入一个 web worker 脚本
- 构建优化
  - CSS 代码分割
  - 预加载指令生成
  - 异步 Chunk 加载优化

## 插件

