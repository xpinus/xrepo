var x = 20;
const obj = {
    x: 10,
    test: () => {
        console.log(this); // {}
        console.log(this.x); // 20 || undefined （严格模式）
    },
    test2: function () {
        const i = () => {
            console.log(this.x);
            // i 是在函数创建执行上下文时确定的
        };
        i();
    },
};
obj.test();
// {}
// undefined

obj.test2();
