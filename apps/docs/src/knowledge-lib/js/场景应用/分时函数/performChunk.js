/**
 * 分时函数
 * @param datas 带执行的数据
 * @param taskHandler 每次执行的任务函数
 * @param scheduler 调度函数，决定任务函数的执行时机
 */
export function performChunk(datas, taskHandler, scheduler) {
    // 参数归一化
    if (typeof datas === 'number') {
        datas = new Array(datas).fill(0).map((_, i) => i);
    }

    let i = 0; // 当前执行的序号

    const _run = () => {
        if (i >= datas.length) return;

        scheduler((goOn) => {
            while (goOn() && i < datas.length) {
                taskHandler(datas[i], i);
                i++;
            }
            _run();
        });
    };

    _run();
}

// 针对浏览器环境暴露一个通用的分时函数
export function browserPerformChunk(datas, taskHandler) {
    const scheduler = (task) => {
        requestIdleCallback((idle) => {
            task(idle.timeRemaining() > 0);
        });
    };

    performChunk(datas, taskHandler, scheduler);
}
