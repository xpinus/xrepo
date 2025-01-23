# DOM
> Document Object Model 文档对象模型

文档对象模型 (DOM) 是 HTML 和 XML 文档的编程接口

它提供了对文档的结构化的表述，并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构，样式和内容

任何 HTML或XML文档都可以用 DOM表示为一个由节点构成的层级结构

创建节点、查询节点、更新节点、添加节点、删除节点、更改样式、绑定事件



## API 

**创建新节点**

```js
createDocumentFragment(); //创建一个DOM片段
createElement(); //创建一个具体的元素
createTextNode(); //创建一个文本节点
```

**添加、移除、替换、插入**

```js
appendChild(); //添加
removeChild(); //移除
replaceChild(); //替换
insertBefore(); //插入
```

**查找**

```js
getElementsByTagName(); //通过标签名称
getElementsByName(); //通过元素的Name属性的值
getElementById(); //通过元素Id，唯一性
```

## 面试题
> 事件冒泡和事件捕捉有什么区别

事件冒泡 在 addEventListener 中的第三属性设置为 false（默认） 从下至上（儿子至祖宗）执行 

事件捕捉 在 addEventListener 中的第三属性设置为 true 从上至下（祖宗到儿子）执行

> offsetWidth/offsetHeight,clientWidth/clientHeight与scrollWidth/scrollHeight的区别

- `offsetWidth/offsetHeight`偏移量：
    - 返回值包含**content + padding + border**，效果与e.getBoundingClientRect()相同
    - ![img](https://img-blog.csdn.net/20180806142425483?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zNzg2MTMyNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
- `clientWidth/clientHeight`客户区大小：
    - 返回值只包含**content + padding**，如果有滚动条，也**不包含滚动条**
    - ![img](https://img-blog.csdn.net/20180806142642108?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zNzg2MTMyNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
- `scrollWidth/scrollHeight`包含滚动内容的元素的大小：
    - 返回值包含**content + padding + 溢出内容的尺寸**
    - ![img](https://img-blog.csdn.net/20180806142830874?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zNzg2MTMyNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

> 冒泡事件很多，记住其他不支持冒泡的事件就好了
- focus
- blur
- mouseenter
- mouseleave
- load
- unload
- resize