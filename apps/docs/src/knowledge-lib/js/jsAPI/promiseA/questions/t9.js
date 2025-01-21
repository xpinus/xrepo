var a;
var b = new Promise((resolve, reject) => {
    console.log('p1');
    setTimeout(() => {
        resolve();
    }, 1000);
})
    .then(() => console.log('p2'))
    .then(() => console.log('p3'));

a = new Promise(async (resolve, reject) => {
    console.log(a);
    await b;
    console.log(a);
    console.log('after b');
    await a;
    resolve(true);
    console.log('after a');
});

console.log('end');
