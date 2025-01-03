# 深浅拷贝

## 浅拷贝
- `Object.assign`
- 或者展开运算符

## 深拷贝
- 可以通过 `JSON.parse(JSON.stringify(object))` 来解决
  - 会忽略 `undefined`和函数
  - 不能解决循环引用的对象
- 第三方库lodash
- 递归拷贝

<run-script  codePath="knowledge-lib/js/手写/深浅拷贝/deepClone.js"></run-script>

## 怎么判断两个对象相等？
> 可以转换为字符串来判断








