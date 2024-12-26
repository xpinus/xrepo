const test = {
	name: "xyf",
	age: 16,
	children: {
		name: "ch1",
		age: 0,
	},
	f: [1, 2, 3],
	others: undefined,
	action: function () {
		console.log(this.name);
	},
};

// test.action();

// 法一  JSON 方法
// const cloneObj = JSON.parse(JSON.stringify(test));
// console.log(cloneObj);
// 函数、undefined都被过滤了

// 法二 递归拷贝
function deepClone(obj, cache = new WeakMap()) {
	if (obj === null || typeof obj !== "object") return obj;
	if (obj instanceof Date) return new Date(obj);
	if (obj instanceof RegExp) return new RegExp(obj);

	if (cache.has(obj)) return cache.get(obj); // 如果出现循环引用，则返回缓存的对象，防止递归进入死循环
	let cloneObj = new obj.constructor(); // 使用对象所属的构造函数创建一个新对象
	cache.set(obj, cloneObj); // 缓存对象，用于循环引用的情况

	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			cloneObj[key] = deepClone(obj[key], cache); // 递归拷贝
		}
	}
	return cloneObj;
}

const cloneObj = deepClone(test);

console.log(cloneObj === test); // false
console.log(cloneObj);
