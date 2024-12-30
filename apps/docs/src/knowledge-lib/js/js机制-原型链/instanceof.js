function myInstanceof(left, right) {
	// if (left === null) return false;

	// // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
	let proto = Object.getPrototypeOf(left); // 获取对象的原型
	prototype = right.prototype; // 获取构造函数的 prototype 对象

	// 判断构造函数的 prototype 对象是否在对象的原型链上
	while (true) {
		if (!proto) return false; //找到也没有找到 尽头Object.prototype.__proto__ = null
		if (proto === prototype) return true; //找到了

		proto = Object.getPrototypeOf(proto); // 接着往上找
	}
}

const test = "";
console.log(myInstanceof(test, Object));

console.log(Object.prototype.toString.call(test));

// 判断是否是对象
Object.prototype.toString.call([]); // '[object Array]'
Object.prototype.toString.call({}); // '[object Object]'
