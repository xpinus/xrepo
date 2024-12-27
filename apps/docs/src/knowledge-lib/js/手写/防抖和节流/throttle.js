/**
 * 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 */
function throttle(func, wait) {
    let timer = null;
    return function (...args) {
        if (timer) return;

        timer = setTimeout(() => {
            func.apply(this, args);
            timer = null;
        }, wait);
    };
}

// 测试：
function eat(fruit) {
    console.log('eat ' + fruit);
}

const slowEat = throttle(eat, 100);

slowEat('apple');
slowEat('apple pie'); // 高频忽略
setTimeout(() => {
    result = slowEat('banana');
}, 500);
