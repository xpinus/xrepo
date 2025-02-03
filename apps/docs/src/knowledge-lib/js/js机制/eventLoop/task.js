/**
 * @description 创建一个宏任务
 */
function macroTask(task) {
    setTimeout(task);
}

/**
 * @description 创建一个微任务
 */
function microTask(task) {

    if (typeof queueMicrotask !== 'undefined') {
        queueMicrotask(task);
    }
    else if (typeof Promise === 'function') {
        Promise.resolve().then(task);
    }
    else if (process && process.nextTick) {
        process.nextTick(task);
    } else if (typeof Promise !== 'undefined') {
        Promise.resolve().then(task);
    } else if (typeof MutationObserver !== 'undefined') {
        const span = document.createElement('span');
        const observer = new MutationObserver(task);
        observer.observe(span, {
            childList: true,
        });
        span.innerHTML = '1';
    } else {
        setTimeout(task);
    }
}

console.log('start');
macroTask(() => {
    console.log('1');
});
microTask(() => {
    console.log('2');
});
console.log('end');
