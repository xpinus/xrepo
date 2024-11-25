---
sort: 30
---

# var、let、const

> 变量提升 
> 
> 暂时性死区
> 
> 块级作用域
> 
> 重复声明
> 
> 修改声明的变量

**变量提升**

var声明的变量存在变量提升，即变量可以在声明之前调用，值为undefined

let和const不存在变量提升，即它们所声明的变量一定要在声明后使用，否则报错

**暂时性死区**

var不存在暂时性死区

let和const存在暂时性死区，只有等到声明变量的那一行代码出现，才可以获取和使用该变量

https://juejin.cn/post/6968399560162951204

```js
var a = 'out'

{
  a = 'in'   // 暂时性死区报错
  let a = 'let-in'
}
```

**块级作用域**

var不存在块级作用域

let和const存在块级作用域, {}包裹的区域

```js
// var
{
    var a = 20
}
console.log(a)  // 20

// let
{
    let b = 20
}
console.log(b)  // Uncaught ReferenceError: b is not defined
```

**重复声明**

var允许重复声明变量

let和const在同一作用域不允许重复声明变量

**修改声明的变量**
var和let可以

const声明一个只读的常量。一旦声明，常量的值就不能改变

