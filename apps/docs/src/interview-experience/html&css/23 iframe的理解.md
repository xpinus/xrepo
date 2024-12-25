---
sort: 23
---



# iframe的理解

参考：https://zhuanlan.zhihu.com/p/168764040

通常我们使用iframe直接直接在页面嵌套iframe标签指定src就可以了。
```js
<iframe src="demo_iframe_sandbox.htm"></iframe>
```
```text
iframe常用属性:
1.frameborder:是否显示边框，1(yes),0(no)
2.height:框架作为一个普通元素的高度，建议在使用css设置。
3.width:框架作为一个普通元素的宽度，建议使用css设置。
4.name:框架的名称，window.frames[name]时专用的属性。
5.scrolling:框架的是否滚动。yes,no,auto。
6.src：内框架的地址，可以使页面地址，也可以是图片的地址。
7.srcdoc , 用来替代原来HTML body里面的内容。但是IE不支持, 不过也没什么卵用
8.sandbox: 对iframe进行一些列限制，IE10+支持
```

**操作iframe内容**
```js
let iframe = document.getElementById('demo');
let iwindow = iframe.contentWindow; // 获取iframe的window对象
let idoc = iframe.contentDocument; // 获取iframe的document对象
```

**iframe使用父级内容**
`window.self`，`window.parent`，`window.top`
![iframe](https://upload-images.jianshu.io/upload_images/7162582-53d566dcd1f1505f.png?imageMogr2/auto-orient/strip|imageView2/2/w/800/format/webp)

**iframe跨域**

`postMessage`

`document.domain`

## pdf预览

参考：[各种文件实现在线预览](https://juejin.cn/post/7038157616291250190)

合同预览怎么做的（用 iframe ），使用 iframe 会造成什么问题，既然会有这些问题为什么还要使用 iframe

```html
  <iframe :scr="pdf文件下载地址"></iframe>
```

## iframe缺点

HTML内嵌框架元素。另一个页面嵌入当前页面
(1) iframe 会阻塞主页面的 Onload 事件；
(2) 搜索引擎的检索程序无法解读这种页面，不利于 SEO;
(3) iframe 和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。

使用 iframe 之前需要考虑这两个缺点。
如果需要使用 iframe
解决：通过 javascript动态给 iframe 添加 src 属性值，这样可以绕开以上两个问题。