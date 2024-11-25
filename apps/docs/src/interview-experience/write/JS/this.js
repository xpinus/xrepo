// var id = "Global";

// function fun1() {
// 	// setTimeout中使用普通函数, setTimeout始终在全局环境window中执行
// 	setTimeout(function () {
// 		console.log("fun1", this.id);
// 	}, 2000);
// }

// function fun2() {
// 	// setTimeout中使用箭头函数
// 	setTimeout(() => {
// 		console.log("fun2", this.id);
// 	}, 2000);
// }

// fun1.call({ id: "Obj" }); // 'Global'

// fun2.call({ id: "Obj" }); // 'Obj'

// 例子一
// let fun = (val) => {
// 	console.log(val); // 111
// 	// 下面一行会报错
// 	// Uncaught ReferenceError: arguments is not defined
// 	// 因为外层全局环境没有arguments对象
// 	console.log(arguments);
// };
// fun(111);

// 例子二
function outer(val1, val2) {
	let argOut = arguments;
	console.log(argOut); // ①
	let fun = () => {
		let argIn = arguments;
		console.log(argIn); // ②
		console.log(argOut === argIn); // ③
		console.log(this);
	};
	fun();
}
outer(111, 222);
