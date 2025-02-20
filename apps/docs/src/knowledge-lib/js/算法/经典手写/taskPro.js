// 任务执行的洋葱模型
class TaskPro {
    _tasks = []
    _isRuning = false;
    _currentTaskIndex = 0;


    addTask(task) {
        this._tasks.push(task)
    }

    async run() {
        if(this._isRuning) return;
        this._isRuning = true;

        await this._runTask()
    }

    async _runTask() {
        if(this._currentTaskIndex >= this._tasks.length) {
            this._isRuning = false;
            this._currentTaskIndex = 0;
            this._tasks = [];
            return;
        }
        const index = this._currentTaskIndex;
        const task = this._tasks[index];
        await task(this._next.bind(this));

        if(index === this._currentTaskIndex) {
            await this._next();
        }
    }

    async _next() {
        this._currentTaskIndex++;
        this._runTask();
    }
}


// 用例
const task = new TaskPro();
task.addTask(async (next) => {
    console.log('start')
    console.log('1')
    await next();
    console.log('end')
})
task.addTask(() => {
    console.log('2')
})
task.addTask(() => {
    console.log('3')
})

task.run();// start 1 2 3 end