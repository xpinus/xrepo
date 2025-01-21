Function.prototype.myApply = function (context, args = []) {
    context = context || globalThis; // 防止传入null或者undefined

    // 将当前函数挂载context上
    const symbol = Symbol();
    context[symbol] = this;

    // 执行函数
    const result = context[symbol](...args);

    // 删除临时的挂载
    delete context[symbol];

    return result;
};

function sayName() {
    console.log('我的名字是: ' + this.name);
}
const obj = {
    name: 'apply',
};
sayName();
sayName.myApply(obj);
