# 虚拟列表
> 面试题：一次性给你 10000 条数据，前端怎么渲染到页面上？
> 分页、虚拟列表、分时函数

虚拟列表是按需显示的一种技术，可以根据用户的滚动，不必渲染所有列表项，而只是渲染可视区域内的一部分列表元素的技术。

![img](https://upload-images.jianshu.io/upload_images/20672535-fe03aee58f31b71d.png?imageMogr2/auto-orient/strip|imageView2/2/w/720/format/webp)

https://www.jianshu.com/p/39404c94dbd0

## 实现一个简单的虚拟列表

### 方案一

<img src="https://upload-images.jianshu.io/upload_images/20672535-46400265e1da0214.png?imageMogr2/auto-orient/strip|imageView2/2/w/830/format/webp" alt="img" style="zoom:50%;" />

* 外层容器设置`height` ,`overflow: scroll`内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容

* 滑动列表：绝对定位，使用`每个列表元素的高度*元素个数=滑动列表高度`
* 可视区域：动态计算可视区域在滑动列表中的偏移量，使用`translate3d `属性动态设置可视区域的偏移量，造成滑动的效果。

### 方案二 

<img src="https://upload-images.jianshu.io/upload_images/20672535-76ae2cc04c6cae79.png?imageMogr2/auto-orient/strip|imageView2/2/w/836/format/webp" alt="img" style="zoom:50%;" />

- 外层容器：设置`height`，`overflow：scroll`
- 顶部：可视区域之前的元素高度
- 尾部：可视区域之后的元素高度
- 可视区域：可视区域内的列表元素

