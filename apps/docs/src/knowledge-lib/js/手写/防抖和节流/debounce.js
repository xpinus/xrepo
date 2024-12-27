/**
 * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @return {function}             返回客户调用函数
 */
function debounce(func, wait) {
    let timer = null;

    return function (...args) {
        let context = this;

        clearTimeout(timer);

        // 通过返回一个promise来拿到执行结果
        return new Promise((resolve, reject) => {
            timer = setTimeout(function () {
                const result = func.apply(context, args);
                resolve(result);
            }, wait);
        });
    };
}

// 测试：
function eat(fruit) {
    console.log('eat ' + fruit);

    return fruit + ' taste good';
}

const slowEat = debounce(eat, 100);

let result = null;
result = slowEat('apple');
result = slowEat('apple pie'); // 只会执行最后一次

result && result.then((res) => console.log(res)); // 打印执行结果
