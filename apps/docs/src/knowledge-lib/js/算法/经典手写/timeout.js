class TimeoutCtrl {
    constructor(time) {
        this.initialTime = time; // 初始时间
        this.remainingTime = time; // 剩余时间
        this.startTime = null; // 开始时间
        this.paused = true; // 初始状态为暂停
        this.timerId = null; // 定时器 ID
    }

    // 开始或继续倒计时
    play() {
        if (this.paused) {
            this.startTime = Date.now(); // 记录开始时间
            this.paused = false;
            this._run();
        }
    }

    // 暂停倒计时
    pause() {
        if (!this.paused) {
            this.paused = true;
            clearTimeout(this.timerId); // 清除定时器
            this.initialTime -= Date.now() - this.startTime; // 更新剩余的初始时间时间
        }
    }

    // 内部运行方法
    _run() {
        if (this.paused) return;

        const now = Date.now();
        const delta = now - this.startTime; // 计算已经过去的时间
        this.remainingTime = this.initialTime - delta; // 更新剩余时间

        if (this.remainingTime > 0) {
            console.log(`剩余时间：${this.remainingTime}ms`);
            this.timerId = setTimeout(() => this._run(), 100); // 每 100ms 检查一次
        } else {
            console.log('时间截止');
            this.remainingTime = 0; // 确保剩余时间不为负数
        }
    }
}

// 测试
const timer = new TimeoutCtrl(60000); // 60 秒倒计时
timer.play();

// 10 秒后暂停
setTimeout(() => {
    timer.pause();
    console.log('已暂停');
}, 10000);

// 20 秒后继续
setTimeout(() => {
    timer.play();
    console.log('已继续');
}, 20000);
