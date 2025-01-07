# 深浅拷贝

## 浅拷贝
- 展开运算符`...`
- `Object.assign`

## 深拷贝
- 可以通过 `JSON.parse(JSON.stringify(object))` 来解决
  - 会忽略 `undefined`和函数
  - 不能解决循环引用的对象
  - 将Date对象转换为字符串
- 第三方库lodash, 递归拷贝
<run-script  codePath="knowledge-lib/js/手写/深浅拷贝/deepClone.js"></run-script>
- structuredClone() API 结构化克隆算法
  - core-js 已经支持 structuredClone 的 polyfill
  - 是浏览器提供的原生API，内部实现已经处理了许多复杂的细节和边缘情况，如循环引用、嵌套对象等，性能更好
  - 可以用于跨线程或跨工作线程的数据传输
  - 不支持拷贝某些复杂类型，如 Function、Dom节点、及对象上的一些特殊参数getter/setter/原型链等









