---
sort: 15
---

# `src`和`href`的区别

* `src`是source的缩写，指向外部资源
  * 在请求资源时会将指向的资源下载并嵌入到当前文档中当前标签的位置，例如`js`脚本、`img`和`iframe`
  * `<script src='demo.js'></script>`当浏览器解析到该标签，会暂停其它资源的下载和处理，直到该资源加载、编译、执行完毕，图片和框架等元素也如此。这也是为什么js脚本放在底部而不是头部
* `href`是Hypertext Reference的缩写，指向网络资源所在位置
  * 建立和当前元素（锚点）或当前文档（链接）之间的链接
  * `<link href="common.css" rel="stylesheet"/>`那么浏览器会识别该文档为`css`文件，就会**并行**下载资源并且不会停止对当前文档的处理。这也是为什么建议使用`link`方式来加载`css`，而不是使用`@import`方式


解析遇到link、script、img标签时，浏览器会向服务器发送请求资源。
script的加载或者执行都会阻塞html解析、其他下载线程以及渲染线程。
link加载完css后会解析为CSSOM(层叠样式表对象模型,一棵仅含有样式信息的树)。css的加载和解析不会阻塞html的解析，但会阻塞渲染。
img的加载不会阻塞html的解析，但img加载后并不渲染，它需要等待Render Tree生成完后才和Render Tree一起渲染出来。未下载完的图片需等下载完后才渲染。
