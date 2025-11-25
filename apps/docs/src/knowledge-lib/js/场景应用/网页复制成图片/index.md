# 网页复制成图片

将网页上的dom元素导出为图片，直接下载或者复制到剪贴板

## 原理

- 获取该区域的 DOM 元素
- 将 DOM 转为 Canvas
- 将 Canvas 转为 Blob
- 将 Blob 写入到剪贴板

> 你提到实现页面元素导出为图片，实现思维导图的到处下载，优化了第三方库
- 不过好在前端已经有了这样的库：html2canvas
- simple-mind-map

导出使用的是html2canvas库，这是它的一个bug，导出svg中的foreignObject中的html标签的颜色样式会丢失，html2canvas库看提交记录基本上是不维护了，所以这个问题应该也会一直存在

dom-to-image-more 3.1.6版本在firfox上导出的时候只有空白图，版本换成2.16.0可以了，可以试试

直接将svg转换成图片就行了

_navigator.clipboard_ 需要在 HTTPS 环境下才能正常工作。在 HTTP 环境下，Clipboard API 将无法使用。