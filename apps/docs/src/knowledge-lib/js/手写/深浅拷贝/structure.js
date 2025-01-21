const student1 = {
    name: '张三',
    hello() {
        console.log('hello');
    },
    score: [{ key: '数学', value: '99' }],
};

try {
    console.log(structuredClone(student1)); // 报错：不能克隆函数
} catch (err) {
    console.warn(err);
}

const student2 = {
    name: '李四',
    score: [{ key: '数学', value: '59' }],
};

console.log(structuredClone(student2));
