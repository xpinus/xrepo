/* 父类 */
class Person {
    age = 18;
    friends = ['小明', '小强'];

    constructor(name) {
        this.name = name;
    }

    showName = function () {
        console.log(this.name);
    };
}

/* 子类 */
class Student extends Person {
    constructor(name) {
        super(name);
    }
}

let s1 = new Student('张三');
s1.showName();
console.log(s1.age); // 18
console.log(s1.friends); // ["小明", "小强"]
console.log(s1.constructor);
