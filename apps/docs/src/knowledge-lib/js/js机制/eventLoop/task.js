/**
 * @description 创建一个宏任务
 */
function macroTask(task) {
    setTimeout(task);
}

/**
 * @description 创建一个微任务 (惰性函数实现)
 */
function microTask(task) {

    if (typeof queueMicrotask !== 'undefined') {
        microTask = (task) =>queueMicrotask(task);
    }
    else if (typeof Promise === 'function') {
        microTask = (task) => Promise.resolve().then(task);
    }
    else if (process && process.nextTick) {
        microTask = (task) => process.nextTick(task);
    }
    else if (typeof MutationObserver !== 'undefined') {
        microTask = (task) => {
            const span = document.createElement('span');
            const observer = new MutationObserver(task);
            observer.observe(span, {
                childList: true,
            });
            span.innerHTML = '1';
        }
    } else {
        microTask = (task) => setTimeout(task);
    }

    microTask(task); // 第一次执行后需要主动调用
}

console.log('start');
macroTask(() => {
    console.log('1');
});
microTask(() => {
    console.log('2');
});
console.log('end');
