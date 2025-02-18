var obj = {
    name: '张三',
    times: [1, 2, 3],
    print: function () {
        this.times.forEach(function (n) {
            console.log('1', this.name);
        }); // 某些数组方法可以接受一个函数当作参数。这些函数内部的 this 指向，很可能也会出错
    },
    print2: function () {
        this.times.forEach(
            function (n) {
                console.log('2', this.name);
            }.bind(this),
        );
    },
};

obj.print(); // 没有任何输出
obj.print2();
