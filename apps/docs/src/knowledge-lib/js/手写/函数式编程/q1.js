function add(arg1) {
    return function (arg2) {
        return arg1 + arg2;
    };
}

function one(operator) {
    if (operator) {
        return operator(1);
    }
    return 1;
}

function two(operator) {
    if (operator) {
        return operator(2);
    }
    return 2;
}

console.log(one(add(two()))); // 3

console.log(two(add(one()))); // 3
