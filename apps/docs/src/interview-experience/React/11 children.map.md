---
sort: 11
---

# props.children

有三种可能 ：
- 1 当前组件没有子节点数据类型就是undefined，

- 2 有一个子节点数据类型就是object.
- 
- 3 有多个子节点的时候才会是array ,只有在多个节点的时候才可以直接调用map方法，react资深提供了一个react.children.map()方法，可以安全遍历子节点对象。
