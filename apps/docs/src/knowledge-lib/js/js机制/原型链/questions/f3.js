function Hello() {}

console.log(Hello.constructor);
console.log(Hello.prototype.constructor);
console.log(Function.constructor);
console.log(Function.prototype.constructor);
console.log(Function.prototype);

// 与Object
console.log(Function.prototype.__proto__ === Object.prototype);
console.log(Function.__proto__.__proto__ === Object.prototype);
