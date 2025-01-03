function outer(val1, val2) {
    let argOut = arguments;
    console.log(argOut); // ①
    let fun = () => {
        let argIn = arguments;
        console.log(argIn); // ②
        console.log(argOut === argIn); // ③
        console.log(this);
    };
    fun();
}
outer(111, 222);
