class MySet {
    constructor(iterator = []) {
        if (typeof iterator[Symbol.iterator] !== 'function') {
            throw new TypeError(`${iterator} is not iterable`);
        }

        this._data = [];

        for (const item of iterator) {
            this.add(item);
        }
    }

    add(item) {
        if (!this.has(item)) {
            this._data.push(item);
        }
    }

    has(item) {
        for (const i of this._data) {
            if (isEqual(i, item)) {
                return true;
            }
        }
        return false;
    }

    delete(item) {
        for (let i = 0; i < this._data.length; i++) {
            if (isEqual(this._data[i], item)) {
                this._data.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    *[Symbol.iterator]() {
        for (const item of this._data) {
            yield item;
        }
    }
}

// 零值相等
function isEqual(a, b) {
    // 让 NaN === NaN, +0 === -0
    if (typeof a === 'number' && typeof b === 'number') {
        return a === b || (a !== a && b !== b);
    }

    return a === b;
}

const mySet = new MySet([1, 2, 3, 2, 'x']);
mySet.delete(1);
console.log(mySet);

for (const item of mySet) {
    console.log(item);
}
