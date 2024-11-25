---
sort: 46
---

# String.prototype.localeCompare()

js提供了字符串的对比方法localeCompare()，该方法返回的是一个数字用来表示一个参考字符串和对比字符串是排序在前，在后或者相同。该方法基本不单独使用，大部分时间是配合**字符串排序**使用的。
```js
// string.localeCompare(targetString,locales,options);

ar strList = ['cc', 'ee', 'ca', 'aa'];
 
strList.sort((a, b) => {
	return a.localeCompare(b);
});
console.log(strList);   //["aa", "ca", "cc", "ee"]
```
