let People = new Proxy(
    {
        _name: 'people',
        get name() {
            return this._name;
        },
    },
    {
        get: function (target, prop, receiver) {
            return target[prop];
            // return Reflect.get(target, prop, receiver);  // 正确
        },
    },
);
let Man = { _name: 'man' };
Man.__proto__ = People; // Man继承People
console.log(Man._name); // man 这个name是打印的Man自身的name，正常
console.log(Man.name); // people 有问题
