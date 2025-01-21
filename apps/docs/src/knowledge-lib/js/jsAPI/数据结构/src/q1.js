const a = 1;

console.log(a.__proto__ === Number.prototype);
// 包装机制：当基础类型尝试去访问一个属性的时候，会转换为对应的包装类型

console.log(a instanceof Number);
// a是基础类型是没有原型链的
