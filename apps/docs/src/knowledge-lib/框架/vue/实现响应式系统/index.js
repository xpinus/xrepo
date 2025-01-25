import reactive from './reactive.js';
import effect from './effect/effect.js';

const obj = {
    a: 1,
    b: 2,
    c: {
        name: '张三',
        age: 18,
    },
};

const arr = [1, obj, 3];

const proxyObj = reactive(obj);

const effectFn = effect(
    () => {
        console.log('响应函数更新');

        effect(() => {
            console.log('响应函数2更新');
            proxyObj.a;
            proxyObj.b;
        });

        if (proxyObj.a === 1) {
            proxyObj.b;
        } else {
            proxyObj.c;
        }
    },
    {
        lazy: true,
    },
);

effectFn();

proxyObj.a = 2;
