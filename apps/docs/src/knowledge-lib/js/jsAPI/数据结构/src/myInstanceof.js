function myInstanceof(left, right) {
    const rightPrototype = right.prototype;
    let leftPrototype = Object.getPrototypeOf(left); // left.__proto__ 非标准不推荐;
    while (true) {
        if (leftPrototype === null) {
            return false;
        }
        if (leftPrototype === rightPrototype) {
            return true;
        }
        leftPrototype = leftPrototype.__proto__;
    }
}

console.log(myInstanceof({}, Object));
