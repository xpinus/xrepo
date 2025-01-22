// 实现
function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

// 用例
(async () => {
    console.log(1);
    await sleep(1000);
    console.log(2);
})();
