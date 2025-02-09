const [a, b] = {
    a: 3,
    b: 4,
    [Symbol.iterator]: function* () {
        yield * Object.values(this);
    }
}

console.log(a, b)