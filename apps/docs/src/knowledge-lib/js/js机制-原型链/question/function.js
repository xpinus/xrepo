// function Hello() {}

// console.log(Hello.constructor); // Function
// console.log(Hello.prototype.constructor); // Hello
// console.log(Function.constructor); // Function
// console.log(Function.prototype.constructor); // Function
// console.log(Function.prototype); // () 函数对象

// // 与Object
// console.log(Function.prototype.__proto__ === Object.prototype);

// console.log(Function.__proto__.__proto__ === Object.prototype);

// function foo() {
// 	console.log(typeof kkk);
// 	console.log(typeof bar);

// 	var kkk;
// 	function bar() {}
// }

// // foo()
// console.log(typeof foo());

// console.log(typeof Array); // function

// var bar = {
// 	foo: function () {
// 		console.log(this); // Arguments
// 		return this.baz; // undefined
// 	},
// 	baz: 1,
// };
// (function () {
// 	console.log(typeof arguments[0]());
// })(bar.foo);

const obj1 = {};
console.log(typeof obj1);
const fn = function () {};
console.log(typeof fn);
const obj2 = {
	call: function () {},
};
Object.setPrototypeOf(obj1, obj2);
console.log(typeof obj1);
