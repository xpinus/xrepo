var a = "out";

// {
// 	a = "in"; // 暂时性死区报错
// 	// let a = "let-in";
// }

{
	console.log(a); // out
	var a = "in";
	console.log(a); // in
}

{
	console.log(b); // undefined
	var b = "in";
	console.log(b); // in
}
