// add
function add() {
    let args = Array.from(arguments);

    let inner = function () {
        args.push(...arguments);
        return inner;
    };

    // 有问题
    inner.toString = function () {
        return args.reduce((pre, cur) => pre + cur);
    };

    return inner;
}

let r1 = add(1, 2, 3)(4);
console.log(r1);
console.log(r1.toString());
const r2 = add(1)(2)(3)(4);
console.log(r2.toString());
