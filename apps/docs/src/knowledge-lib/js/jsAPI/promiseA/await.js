// async function add() {
//     console.log('1 + 1 = ?');
//     const res = await Promise.resolve(2);
//     console.log(res);
// }
// add();

function* task() {
    console.log('1 + 2 = ?');
    let res = yield Promise.resolve(3);
    console.log(res);
}

function run() {
    const generator = task(); // 1. 创造一个Gnerator
    let result = generator.next(); // 2. 第一次next，开始执行任务

    iter();

    // 不断迭代直到done
    function iter() {
        if (result.done) return;

        if (result.value instanceof Promise) {
            // 如果是一个promise则等待promise完成
            result.value.then(
                (data) => {
                    // 继续执行迭代器，将数据向下传递
                    result = generator.next(data);
                    iter();
                },
                (reason) => {
                    result = generator.throw(reason); // 在迭代器内抛出错误
                    iter();
                },
            );
        } else {
            result = generator.next(result.value);
            iter();
        }
    }

    return result.value;
}

run();
