function myInstanceof(left, right) {
    const rightPrototype = right.prototype;
    let leftPrototype = Object.getPrototypeOf(left); // left.__proto__ 非标准不推荐;
    while (leftPrototype) {
        if (leftPrototype === rightPrototype) {
            return true;
        }
        leftPrototype = Object.getPrototypeOf(leftPrototype);
    }
    return false;
}

console.log(myInstanceof({}, Object));
