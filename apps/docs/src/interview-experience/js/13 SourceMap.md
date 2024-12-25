---
sort: 23
---

# sourceMap
## 什么是 Source Map

通俗的来说， `Source Map` 就是一个信息文件，里面存储了代码打包转换后的位置信息，实质是一个 `json` 描述文件，维护了打包前后的代码映射关系。

我们线上的代码一般都是经过打包的，如果线上代码报错了，想要调试起来，那真是很费劲了。根本没法找到具体位置以及原因，所以这个时候， `Source Map` 的作用就来了

## Source Map 的作用

上面的案例只是 `Source Map` 的初体验，现在来说一下它的作用，我们为什么需要 `Source Map` ?

阮一峰老师的**JavaScript Source Map 详解**指出，JavaScript 脚本正变得越来越复杂。大部分源码（尤其是各种函数库和框架）都要经过转换，才能投入生产环境。

常见的源码转换，主要是以下三种情况：

- 压缩，减小体积
- 多个文件合并，减少 HTTP 请求数
- 其他语言编译成 JavaScript

这三种情况，都使得实际运行的代码不同于开发代码，除错（ `debug` ）变得困难重重，所以才需要 `Source Map` 。结合上面的例子，即使打包过后的代码，也可以找到具体的报错位置，这使得我们 `debug` 代码变得轻松简单，这就是 `Source Map` 想要解决的问题。

## 如何生成 Source Map

各种主流前端任务管理工具，打包工具都支持生成 `Source Map` 。

* `Webpack` 是前端打包工具（本文案例都会使用该打包工具）。在其配置文件 `webpack.config.js` 中设置**devtool**即可生成 `Source Map` 文件：

```js
const path = require('path');

module.exports = {   
    entry: './src/index.js',  
    output: {      
        filename: 'bundle.js',      
        path: path.resolve(__dirname, 'dist')  
    },  
    devtool: "source-map"
};
```

* Vue-cli
* React-cli

## 如何使用 Source Map

生成 `Source Map` 之后，一般在浏览器中调试使用，前提是需要开启该功能，以 `Chrome` 为例：

打开开发者工具，找到 `Settins` ：选中`Enable javascript source maps`和`Enable css source maps`

## Source Map 的工作原理

还是上面这个案例，执行打包后，生成 `dist` 文件夹，打开 `dist/bundld.js` ：

https://mp.weixin.qq.com/s/VUcpY_y3_ihBBsFOLzKlfg

