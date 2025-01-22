---
sort: 8
---

# 怎样添加、移除、移动、复制、创建和查找节点

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

> 事件冒泡和事件捕捉有什么区别

事件冒泡 在 addEventListener 中的第三属性设置为 false（默认） 从下至上（儿子至祖宗）执行 

事件捕捉 在 addEventListener 中的第三属性设置为 true 从上至下（祖宗到儿子）执行