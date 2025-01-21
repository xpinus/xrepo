function Person() {}
var person1 = new Person();

console.log(person1.constructor === Person);
console.log(Person.constructor === Function);
console.log(Function.constructor === Function);
