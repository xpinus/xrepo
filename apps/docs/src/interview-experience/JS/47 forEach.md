---
sort: 47
---

# for和forEach区别
https://juejin.cn/post/7018097650687803422

1. 语法上的区别
```js
for

```

```js
forEach((element, index, array) => { /* … */ }, thisArg)
// 其中thisArg可选，可以设置cb函数中的this指向

// 在js中有break return continue 对函数进行中断或跳出循环的操作，我们在 for循环中会用到一些中断行为，对于优化数组遍历查找是很好的，但由于forEach属于迭代器，只能按序依次遍历完成，所以不支持上述的中断行为。
// 借助try/catch：在forEach内触发throw Error

//  for 循环可以控制循环起点, forEach 的循环起点只能为0不能进行人为干预，而for循环不同
```
2. 本质区别

forEach 是负责遍历（Array Set Map）可迭代对象的，而 for 循环是一种循环机制，只是能通过它遍历出数组。

可迭代对象：ES6中引入了 iterable 类型，Array Set Map String arguments NodeList 都属于 iterable，他们特点就是都拥有 [Symbol.iterator] 方法，包含他的对象被认为是可迭代的 iterable。


3. 性能区别

性能比较：for > forEach > map 

在chrome 62 和 Node.js v9.1.0环境下：for 循环比 forEach 快1倍，forEach 比 map 快20%左右。

原因分析for：for循环没有额外的函数调用栈和上下文，所以它的实现最为简单。forEach：对于forEach来说，它的函数签名中包含了参数和上下文，所以性能会低于 for 循环。map：map 最慢的原因是因为 map 会返回一个新的数组，数组的创建和赋值会导致分配内存空间，因此会带来较大的性能开销。

