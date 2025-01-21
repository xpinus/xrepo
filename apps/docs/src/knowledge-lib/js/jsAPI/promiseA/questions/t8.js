Promise.resolve(1).then(2).then(Promise.resolve(3)).then(console.log);

// then中传递的如果不是函数，就可以直接忽略
