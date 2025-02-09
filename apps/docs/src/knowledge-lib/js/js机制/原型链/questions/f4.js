const o = (function() {
    const obj = {
        a: 1,
        b: 2
    }

    return {
        get: function(key) {
            return obj[key]
        }
    }
})();

// 如何在不修改上面代码的情况下修改内部obj

//

Object.defineProperty(Object.prototype, 'hack', {
    get() {
        return this; // 返回对象自身，从而拿到数据
    }
})

const r = o.get('hack');
r.c = 'ccc';
console.log(r)