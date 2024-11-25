let parent = {
	name: "xue",
	location: "jiangsu",
};

const symbol3 = Symbol("test");
let son = {
	age: 25,
	2: "numSort2",
	1: "numSort3",
	symbol3: "symbolSort",
};

Object.setPrototypeOf(son, parent); // 设置一个指定的对象的原型

// for in
/*
 * (1) 顺序问题：当属性的类型时数字类型时，会按照数字的从小到大的顺序进行排序，有限打印；字符串则按照时间顺序；
 * (2) for in 会枚举原型链中的属性
 */
for (let key in son) {
	console.log(key, son[key]);
}

console.log("##################");

// Object.keys 顺序问题同样
console.log(Object.keys(son).join(" "));

console.log("##################");

// Object.entries 顺序问题同样
console.log(Object.entries(son).join(" "));
