var a = { n: 1}
var b = a;
a.x = a = { n: 2 }
console.log(a.x)
console.log(b.x)


// 先定位a.x开辟空间，在执行后面的表达式