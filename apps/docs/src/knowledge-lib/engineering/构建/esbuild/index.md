# Esbuild 

[Esbuild深度调研：吹了三年，能上生产了吗？](https://juejin.cn/post/7310168607342624808)

## 是否支持 .js、.jsx、.ts、.tsx

无需像 Webpack 那样配置 loader，而是 esbuild 自动就识别 .tsx 文件并进行解析；

esbuild 通过内置了一部分 loader, 支持对 .js、.jsx、.ts、.tsx 等文件进行解析。

## 是否支持 .css、.module.css、.less、.module.less

不支持解析 .less 文件，且没有对应的 loader，需要我们手动配置插件

```js
//省略其他
const { lessLoader: lessLoaderPlugin } = require("esbuild-plugin-less");

const options = {
  //省略其他
  plugins: [
    lessLoaderPlugin({
      // 该插件还支持全局的主题配置
      globalVars: {
        primaryColor: "blue",
      },
    }),
  ],
};

esbuild.build(options).catch((e) => console.log(e));
```

## 是否支持字体图标或其它文件

报错：No loader is configured for ".woff2 .ttf .woff .svg .eot"

有两个 loader 可供选择：
- file loader：将文件复制到输出目录下，并返回对应的文件名称（类型于 Webpack 的 file-loader）。
  - 适用于大型文件，可以有效减少 js 文件的大小，同时更有利于缓存。但由于每个文件都需要额外的网络请求，可能会影响页面的加载性能，特别是对于大量小文件的情况
- dataurl loader：将文件内容以 Base64 编码的形式直接包含在 URL 中。这样可以减少对服务器的请求，提高页面加载速度。
  - 将文件内容嵌入到 js 中，减少了对服务器的额外请求，特别适用于小型文件。但可能会显著增加文件体积，且不利于缓存，只要 bundle 有变化，都需要重新下载
  - 一般情况下，我们会设置当资源文件小于 8KB 时使用 dataurl loader，否则使用 file loader

```js
// 省略其他
const options = {
  loader: {
    ...,
   ".ttf": "dataurl", // 为了支持字体图标
   ".eot": "dataurl", // 为了支持字体图标
   ".woff": "dataurl", // 为了支持字体图标
   ".woff2": "dataurl", // 为了支持字体图标
   ".svg": "dataurl", // 为了支持字体图标
  },
};
```

这里根据 esbuild 所提供的 loader 做个总结：
- js：处理 .js 文件，不多说。
- jsx：处理 .jsx 文件，不多说。
- ts：处理 .ts 文件，不多说。
- tsx：处理 .tsx文件，不多说。
- css：处理 .css文件，不多说。
- local-css：处理 .module.css 文件，支持 css module。
- global-css：处理全局 css 文件，代表不启用 css module 模式（如果对 .module.css 文件配置该 loader，代表用正常 css loader 进行处理）。
- json：处理 .json 文件，不多说。
- file：可处理任何格式文件。该 loadder 会将文件复制到输出目录，并将文件名作为字符串嵌入到包中，和 webpack 的 file-loader 一样。
- text：处理文本文件。
- base64：将文件转换为 Base64 编码。
- dataurl：将文件转换为 Data URL 格式。类似于 Base64 Loader，将文件直接嵌入到代码中，但以 Data URL 形式。
- binary：用于处理不需要转换的二进制文件。
- copy：复制文件到输出目录而不进行处理。
- empty：生成一个空的模块。更多时候用于占位，或在某些情况下需要一个空模块时使用。


## 是否支持常规的图片资源

**优化**
在webpack中
```js
  {
   test: /\.(png|jpe?g|gif|svg)$/,
   type: "asset",
   parser: {
     dataUrlCondition: {
       maxSize: 8 * 1024, //如果文件不超过8kb才转换为 base64 URL
     },
   },
 },
```

发现在 esbuild 内部并不支持我们动态的去切换 loader，需要通过第三方插件来完成

```js
// 省略其他
+ const inlineImagePlugin = require("esbuild-plugin-inline-image");

const options={
  // 省略其他
  plugins: [
   inlineImagePlugin({
     limit: 8 * 1024, // 默认为10000，超过这个数用 file loader，否则用 dataurl loader
     // 这里如果 loader 中配置了 png 格式用 file loader，但是插件这里又配了，以这里的为准
     extensions: ["jpg", "jpeg", "png", "gif", "svg", "webp", "avif"], // 要处理的文件格式，默认为这些
    }),
  ],
}
```

## 路径别名

```js
const options={
  // 配置别名，不仅可以配置路径，还可以配置包名
  alias: {
    // 这里还运行替换包名，当识别hello 这个包时自己用成 react 包，这个功能还是很有用的，比如替换为华为最近发布的包
    // hello: "react",
    "@": path.resolve(__dirname, "./src"),
    "@imgs": path.resolve(__dirname, "./src/imgs"),
    "@pages": path.resolve(__dirname, "./src/pages"),
  },
}
```
不仅可以配置路径，还能替换包名

## sourcemap

- linked：生成单独的 .js.map 文件，并在 .js 文件中包含 //# sourceMappingURL = 地址。它的优点是可以 source-map 文件独立出来，减小生成的 .js 文件大小。
- external：生成单独的 .js.map 文件，但 .js 文件不包含 //# sourceMappingURL = 地址。它的优点是 source-map 文件独立存储，但 .js 文件不包含显式的 source-map 地址。
- inline：将 source-map 文件以 Base64 形式追加到 .js 文件的末尾，不生成额外的 .js.map 文件。它最大的优点是方便部署，一次加载即可获取源映射信息。但由于源映射通常较大，会显著增加 .js 文件的大小。
- both：同时生成 inline 和 external，即在 .js 文件末尾追加 inline，并生成单独的 .js.map 文件。该模式结合了 inline 和 external 的优势，可在 .js 文件中快速获取源映射信息，并且也有独立的 .js.map 文件备份。很难说这是优点还是缺点，暂时没想到应用场景

## 排除第三方包

```js
// 省略其他
const options={
  // 将这几个模块标记为外部依赖
+  external: ["react", "react-dom", "lodash"],
}
```

esbuild 对于 external 的实现方式有点不同。即使我们配置了 external 属性，告诉 esbuild 这些模块不参与构建过程，但它依然会[保留导入语句](https://github.com/evanw/esbuild/issues/3509)

## 代码压缩

```js
const options={
 // 开启压缩
 minify: true
}
```

## css 加厂商后缀 + API 转换

在 Webapck 中一般是用 PostCSS 和相应的插件来解决此类问题的

但在 esbuild 中很简单，只需配置需要兼容的浏览器即可

```js
 // 省略其他
const options={
    // 配置兼容的浏览器或js版本
     target: ["es2015", "chrome53", "firefox68"],
}
```

但是有些属性仅仅加前缀是不够的，比如上面我们用到的 var (css 变量) 这个 API，谷歌浏览器 67 以上版本才支持，这个时候单独配置 esbuild 的 target 属性是不会生效的。

如果我们想要在低浏览器中生效，就必须要生成对应的 polyfills。

由于在生产环境中需要用到大量插件，所以更多的时候是使用插件的合集，也就是预设。它里面包含了很多我们需要用到的插件：postcss-preset-env

```js
const postcss = require("postcss");
const postcssPresetEnv = require("postcss-preset-env");
const cssVariables = require("postcss-css-variables");

const options={
  plugins:[
    // 配置css兼容性问题
    {
      name: "postcss-plugin",
      async setup(build) {
        build.onLoad({ filter: /.css$/ }, async (args) => {
          const css = await fs.promises.readFile(args.path, "utf8");

          const result = await postcss([
              postcssPresetEnv,
              cssVariables,
          ]).process(css, {
            from: args.path,
          });

          return { contents: result.css, loader: "css" };
        });
      },
    },
  ]
}


```

postcss 一般是需要配置所兼容的浏览器版本，但 esbuild 中配置的 target 属性并不会在 postcss 中生效。因此我们还是需要在 package.json 中配置browserslist 属性来告诉 postcss 我们需要兼容哪些浏览器

从这里可以看出，esbuild 的 targets 能力其实很有限，仅仅会做一些语法上的兼容

```js
//package.json：
// 在生产环境中，支持全球浏览器市场份额大于 0.2% 的浏览器，并且特别指定要支持 IE 浏览器版本
// 在开发环境中，支持最新版本的 Chrome 和 Firefox 浏览器

// 这个配置不仅 postcss 会用到，babel 等工具同样会读取该配置，是一个业内标准配置

  "browserslist": {
    "production": [
      "> 0.2%",
      "ie 10"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version"
    ]
  }
```

## js 兼容老浏览器 + API 转换

同理，对于 js 文件来说，esbuild 也只能根据 target 属性来兼容部分语法，遇到 API 同样无能为力。

比如 ?? 运算符是在 Chrome 80 中引入的，当遇到 Chrome 79 或更早版本时，esbuild 会将其转换为等效的条件表达式, 对于 Promise 这种 API 的兼容，需要通过 Babel 等工具来转换

```shell
yarn add core-js @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript
```

```js
+ const babel = require("@babel/core");

const options={
   // 省略其他
  plugins:[
    // 配置babel插件
    {
      name: "esbuild-plugin-babel",
      setup(build) {
        const options = {
          filter: /.ts?x$/,
          namespace: "",
        };
        const transformContents = ({ args, contents }) => {
          const babelOptions = babel.loadOptions({
            // // targets: "> 0.25%, not dead",
            // targets: {
            //   chrome: "58",
            //   ie: "11",
            // },
            filename: args.path,
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: 3, //需要指定安装core-js的版本，我这里安装的是 "core-js": "^3.23.4"
                },
              ],
              "@babel/preset-react", //预设是从前往后执行
              "@babel/preset-typescript",
            ],
            // "plugins": ["@babel/plugin-transform-block-scoping"],
            caller: {
              name: "esbuild-plugin-babel",
              supportsStaticESM: true,
            },
          });
          return new Promise((resolve, reject) => {
            babel.transform(contents, babelOptions, (error, result) => {
              error ? reject(error) : resolve({ contents: result.code });
            });
          });
        };
        build.onLoad(
          { filter: options.filter, namespace: options.namespace },
          async (args) => {
            const contents = await fs.promises.readFile(args.path, "utf8");

            return transformContents({ args, contents });
          }
        );
      },
    },
  ]
}
```

这里不用配置需要兼容的浏览器版本信息，babel 默认会读取 package.json 中的 browserslist 属性


## tree shaking

功能正常

## 代码分割，将第三方包单独抽离

```js
const options={
   // 开启代码分割
   splitting: true,
   // splitting 捆绑销售，没办法，想要用代码分割，必须设置 format 为 esm
   format: "esm"
}
```

经过测试，esbuuld 的代码分割能力很鸡肋。只能对动态 import 的内容或多入口同时用到的代码进行分割。
也就是基于入口进行分割的，如果是单入口的项目压根用不了这个功能。
假如我们多个地方都使用到了 Antd 组件，我希望将用到的 Antd 组件单独打包出去，实现不了......
并且该功能只支持 esm 格式，对浏览器版本有限制，也没有相关的插件解决。

## 文件加 hash

```js
// 省略其他
const options={
  // 对资源文件分类和加内容 hash
  // 当用 file loader 解析的文件都会放在这里
  assetNames: "assets/[name]-[hash]",
  // 对 js、cs 进行分类
  chunkNames: "[ext]/[name]-[hash]",
  // 对入口文件进行分类并加 hash
  entryNames: "[name]-[hash]",
}
```

## 构建前清空 dist 文件夹

```js
const { clean } = require("esbuild-plugin-clean");

const options={
  // 省略其他
  plugins:[
     clean({ patterns: "dist/*" }),
  ]
}
```

## 构建前进行 ts 类型检测（可选）

esbuild 在对 .ts 文件和 .tsx 文件打包的过程中并不支持类型检测。作者也明确表示未来也不会支持TS 类型检查能力。当然，大部分构建工具都不支持。

Webpack 中往往是通过插件 fork-ts-checker-webpack-plugin 来进行前置校验

## 总结

esbuild 的优势很明显，它具有极快的构建速度、可扩展性、支持多种格式、不需要设置各种 loader，配置简单等特点

真实的应用场景还有很多不足：
社区生态很弱，跟 Webpack 和 Vite 完全不在一个量级
插件之间兼容性问题很严重，这也是为啥在调研过程中写了不少插件的原因...
代码分割能力太弱，只能基于入口进行分割
对目标浏览器版本有一定要求
不支持 HMR
为了保持结构的一致性，没有提供转化的 AST 的 API
由于工具和插件还是采用 JavaScript 编写，存在解析速度相对较慢的可能性
对于复杂场景，配置还是像 Webpack 一样复杂（其实可以内置一些插件）

### vite为何不用 ESBuild 打包？

虽然 esbuild 快得惊人，并且已经是一个在构建库方面比较出色的工具，但一些针对构建 应用 的重要功能仍然还在持续开发中 —— 特别是代码分割和 CSS 处理方面。就目前来说，Rollup 在应用打包方面更加成熟和灵活。尽管如此，当未来这些功能稳定后，我们也不排除使用 esbuild 作为生产构建器的可能。