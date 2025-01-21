class MyMap {
    constructor(iterator = []) {
        if (typeof iterator[Symbol.iterator] !== 'function') {
            throw new TypeError(`${iterator} is not iterable`);
        }

        this._data = [];

        for (const item of iterator) {
            if (typeof item[Symbol.iterator] !== 'function') {
                throw new TypeError(`${item} is not iterable`);
            }
            const iterator = item[Symbol.iterator]();
            const key = iterator.next().value;
            const value = iterator.next().value;
            this.set(key, value);
        }
    }

    set(key, value) {
        const obj = this._getObj(key);
        if (obj) {
            obj.value = value;
        } else {
            this._data.push({
                key,
                value,
            });
        }
    }

    has(key) {
        return !!this._getObj(key);
    }

    _getObj(key) {
        for (const i of this._data) {
            if (isEqual(i.key, key)) {
                return i;
            }
        }
    }

    forEach(callback) {
        for (const i of this._data) {
            callback(i.value, i.key, this);
        }
    }
}

// 同值相等
function isEqual(a, b) {
    if (a === 0 && b === 0) {
        return true;
    }
    return Object.is(a, b);
}

const mp1 = new MyMap([
    ['a', 3],
    ['b', 4],
    ['c', 5],
]);
const obj = {};
mp1.set(obj, 6456);
mp1.set('a', 'abc');

mp1.forEach((a1, a2, a3) => {
    console.log(a1, a2);
});
