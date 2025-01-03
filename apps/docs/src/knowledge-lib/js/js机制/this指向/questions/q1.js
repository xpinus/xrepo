let fun = (val) => {
    console.log(val); // 111
    // 下面一行会报错
    // Uncaught ReferenceError: arguments is not defined
    // 因为外层全局环境没有arguments对象
    console.log(arguments);
};
fun(111);
