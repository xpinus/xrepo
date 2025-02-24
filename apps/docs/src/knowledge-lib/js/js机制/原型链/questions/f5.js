const Foo = function () {
    this.a = function () {
        // 实例方法
        console.log('2');
    };
};
Foo.prototype.a = function () {
    // 原型链方法
    console.log('3');
};
Foo.a = function () {
    // 静态方法
    console.log('4');
};
let obj = new Foo();
obj.a(); // 打印什么？ 为什么
