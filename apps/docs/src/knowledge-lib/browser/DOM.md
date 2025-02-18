# DOM
> Document Object Model 文档对象模型

- 它提供了**对文档的结构化**的表述，任何HTML或XML文档都可以用DOM表示为一个由节点构成的层级结构
- **提供API**用于修改文档，创建节点、查询节点、更新节点、添加节点、删除节点、更改样式、绑定事件


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

- **捕获阶段**：从window对象传导到目标节点（上层传到底层）称为“捕获阶段”（capture phase）
- **目标阶段**：在目标节点上触发，称为“目标阶段”
- **冒泡阶段**：从目标节点传导回window对象（从底层传回上层），称为“冒泡阶段”（bubbling phase）。事件代理即是利用事件冒泡的机制把里层所需要响应的事件绑定到外层；
  - `event.target`判断具体有哪个子节点触发
  - `currentTarget`是指其事件处理程序当前正在处理事件的那个元素

事件冒泡 在 addEventListener 中的第三属性设置为 false（**默认**）  

事件捕捉 在 addEventListener 中的第三属性设置为 true 

**冒泡事件很多，记住其他不支持冒泡的事件就好了**
- focus
- blur
- mouseenter
- mouseleave
- load
- unload
- resize

> 什么是事件代理

事件代理（`Event Delegation`），又称之为事件委托。是 `JavaScript` 中常用绑定事件的常用技巧。顾名思义，“事件代理”即是把原本需要绑定的事件委托给父元素，让父元素担当事件监听的职务。事件代理的原理是 DOM 元素的事件冒泡。使用事件代理的好处是可以提高性能
- **原理：事件冒泡**
- 优点：
  - 可以大量节省内存占用，减少事件注册，比如在`ul`上代理所有`li`的`click`事件就非常棒
  - 可以实现当新增子对象时无需再次对其绑定

> offsetWidth/offsetHeight,clientWidth/clientHeight与scrollWidth/scrollHeight的区别

- `offsetWidth/offsetHeight`偏移量：
    - 返回值包含**content + padding + border**，效果与e.getBoundingClientRect()相同
- `clientWidth/clientHeight`客户区大小：
    - 返回值只包含**content + padding**，如果有滚动条，也**不包含滚动条**
- `scrollWidth/scrollHeight`包含滚动内容的元素的大小：
    - 返回值包含**content + padding + 溢出内容的尺寸**

