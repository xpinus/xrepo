// class Example {
//     constructor(name) {
//         this.name = name;
//     }
//
//     func() {
//         console.log(this.name)
//     }
// }

'use strict'; // 1. 类运行在严格模式

function Example(name) {
    // 2. 类必须使用new调用
    if(!new.target) {
        throw new Error('Class constructor Example cannot be invoked without "new"');
    }
    this.name = name;
}

Object.defineProperty(Example.prototype, 'func', {
    enumerable: false, // 3. 不可枚举
    value: function () {
        // 4. 类内方法不能使用new调用
        if(new.target) {
            throw new Error('Example.prototype.func is not a constructor');
        }
        console.log(this.name);
    }
})