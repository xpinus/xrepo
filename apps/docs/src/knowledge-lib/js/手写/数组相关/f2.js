const arr = [1, {
    a: 2,
    b: 3,
}, {
    a: 2,
    b: 3,
}, 1, {c: undefined}, {d: undefined}]

function unique(arr) {
    const result = [];

    outer: for(const item of arr) {
        for(const r of result) {
            if(isEqual(item, r)) {
                continue outer;
            }
        }

        result.push(item);
    }

    return result;
}

function isEqual(a, b) {
    if(isPrimitive(a) || isPrimitive(b)) {
        return Object.is(a, b);
    }

    const entriesA = Object.entries(a);
    const entriesB = Object.entries(b);

    if(entriesA.length !== entriesB.length) {
        return false;
    }

    for(const [key, value] of entriesA) {
        if(!isEqual(value, b[key]) || !b.hasOwnProperty(key)) {
            return false;
        }
    }

    return true
}

// 判断是否为原始类型
function isPrimitive(value) {
    return value !== Object(value)
}

console.log(unique(arr));