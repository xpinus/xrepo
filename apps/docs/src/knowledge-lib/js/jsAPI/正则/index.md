# 正则表达式


## API
> 字符串的正则方法有：match()、replace()、search()、split()
- `String.prototype.match()`:属于String正则表达方法
```js
const paragraph = 'The quick brown fox jumps over the lazy dog. It barked.';
const regex = /[A-Z]/g;
const found = paragraph.match(regex);

console.log(found);
// Expected output: Array ["T", "I"]
```

> 正则对象的方法有：exec()、test()
- `RegExp.prototype.exec()`方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。
```js
var page = '第10页';
var pagenume = /第(\d+)页/.exec(page)[1]  // 10
```

[正则表达式中的exec和match方法的区别](https://www.cnblogs.com/heshan1992/p/6259171.html)
