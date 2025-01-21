function Hello() {}
var h = new Hello();

console.log(Hello.prototype);
console.log(Hello.prototype.constructor === Hello);
console.log(h.prototype);
console.log(h.constructor === Hello);
console.log(h.constructor === Hello.prototype.constructor);
console.log(h.__proto__ === Hello.prototype);
console.log(h.__proto__ === h.constructor.prototype);
console.log(Hello.prototype === h.constructor.prototype);
console.log(Hello === h.constructor);
