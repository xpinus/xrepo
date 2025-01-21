Function.prototype.myBind = function (context, ...args) {
    // 获取当前函数
    const fn = this;

    return function (...newArgs) {
        return fn.apply(context, [...args, ...newArgs]); // bind参数具有柯里化的性质
    };
};

function sayName(age) {
    console.log('我的名字是: ' + this.name + ' 年龄：' + age);
}
const obj = {
    name: 'bind',
};
sayName(18);

const fn = sayName.bind(obj);
fn(18);
