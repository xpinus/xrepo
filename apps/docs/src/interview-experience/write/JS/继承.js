// ES5
function Parent(name) {
	this.name = name;
}
Parent.prototype.say = function () {
	console.log("i am " + this.name);
};

function Child(name, age) {
	Parent.call(this, name);
	this.age = age;
}
Child.prototype = Object.create(Parent.prototype);
// 记得重点实践比较个方法的区别
// Child.prototype.contructor = Child;

// ES6
// class Parent {
// 	constructor(name) {
// 		this.name = name;
// 	}

// 	say() {
// 		console.log("i am " + this.name);
// 	}
// }

// class Child extends Parent {
// 	constructor(name, age) {
// 		super(name);
// 		this.age = age;
// 	}
// }

// 测试
let xm = new Child("xiaoming", 12);
console.log(xm.contructor);
// console.log(xm.name); // xiaoming
// console.log(xm.age); // 12
// xm.say();

// let xh = new Child("xiaohong", 11);
// console.log(xh.name); // xiaoming
// console.log(xh.age); // 12
// xh.say();
