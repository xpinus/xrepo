class MemoMap {
    #map = new Map();
    #weakMap = new WeakMap();

    _isObject(key) {
        return typeof key === 'object' && key !== null;
    }

    has(key) {
        if(this._isObject(key)) {
            return this.#weakMap.has(key)
        }else {
            return this.#map.has(key);
        }
    }

    get(key) {
        if(this._isObject(key)) {
            return this.#weakMap.get(key);
        }else {
            return this.#map.get(key);
        }
    }

    set(key, value) {
        if(this._isObject(key)) {
            this.#weakMap.set(key, value);
        }else {
            this.#map.set(key, value);
        }
    }
}

function memoize(func, resolver) {
    function memoized(...args) {
        const key = resolver ? resolver(...args) : args[0];
        if(memoized.cache.has(key)){
            return memoized.cache.get(key);
        }
        const value = func(...args);
        memoized.cache.set(key, value);

        return value
    }
    memoized.cache = new MemoMap();
    return memoized
}

var object = { a:1, b:2 };

var values = memoize((obj) => Object.values(obj));
console.log(values(object)); // [1,2]

object.a = 3;
console.log(values(object)); // [1,2]

values.cache.set(object, ['a', 'b']) // 允许手动更新缓存
console.log(values(object)) // ['a', 'b']