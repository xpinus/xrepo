var x = 20;
const obj = {
    x: 10,
    test: () => {
        console.log(this); // {}
        console.log(this.x); // undefined
    },
    test2: function () {
        const i = () => {
            console.log(this.x);
            // i 是以函数的形式被调用的，所以 this 指向全局
            // 在浏览器环境中打印出 JavaScript，node 里面为 undeifned
        };
        i();
    },
};
obj.test();
// {}
// undefined

obj.test2();
