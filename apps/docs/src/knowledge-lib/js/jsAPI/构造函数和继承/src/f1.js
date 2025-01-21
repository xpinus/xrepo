/* 父类 */
function Person(name) {
    this.name = name;
    this.showName = function () {
        return this.name;
    };
}
// 原型对象上添加属性
Person.prototype.age = 18;
Person.prototype.friends = ['小明', '小强'];

/* 子类 */
function Student(name) {
    Person.call(this, name); // 构造函数继承
}
Student.prototype = Object.create(Person.prototype); // 原型链继承
Student.prototype.constructor = Student;

let s1 = new Student('张三');
s1.showName();
console.log(s1.age); // 18
console.log(s1.friends); // ["小明", "小强"]
console.log(s1.constructor);

//问题：一个实例修改了原型属性，另一个实例的原型属性也会被修改
//解决：就TMD不要卸载prototype上
s1.friends.push('李四');
let p1 = new Person();
console.log(p1.friends); // ["小明", "小强", "李四"]
