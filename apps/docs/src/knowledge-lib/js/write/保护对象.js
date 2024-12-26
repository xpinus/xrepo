// 开启严格模式: 阻止静默失败
"use strict";

// 对象具有: 增删改查 4个操作
// 其中 增删改 都会影响原对象
let obj = {
	id: 10001,
	name: "看看",
	age: 33,
};
/*
 * 1. 阻止 新增 属性
 */
// Object.preventExtensions(obj);
// obj.salary = 120000;  // 报错:Cannot add property salary, object is not extensible

/*
 * 2. 阻止 增删 属性
 *    seal: 密封
 */
// Object.seal(obj);
// obj.salary = 120000; // 报错:Cannot add property salary, object is not extensible
// delete obj.age;  // Cannot delete property 'age' of #<Object>

/*
 * 3. 阻止 增删改 属性
 *    freeze: 冻结
 */
// Object.freeze(obj);
// obj.salary = 220000; // 报错
// delete obj.age;
// obj.id = 33;

console.log(obj);
