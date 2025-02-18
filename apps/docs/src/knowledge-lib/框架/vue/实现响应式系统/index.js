import reactive from './reactive.js';
import effect from './effect/effect.js';
import computed from './computed.js';
import watch from './watch.js';

// const obj = {
//     a: 1,
//     b: 2,
//     c: {
//         name: '张三',
//         age: 18,
//     },
// };
//
// const arr = [1, obj, 3];
//
// const proxyObj = reactive(obj);
//
// const effectFn = effect(
//     () => {
//         console.log('响应函数更新');
//
//         effect(() => {
//             console.log('响应函数2更新');
//             proxyObj.a;
//             proxyObj.b;
//         });
//
//         if (proxyObj.a === 1) {
//             proxyObj.b;
//         } else {
//             proxyObj.c;
//         }
//     },
//     {
//         lazy: true,
//     },
// );
//
// effectFn();
//
// proxyObj.a = 2;

const state = reactive({
    a: 1,
    b: 2,
});
const sum = computed(() => {
    console.log('计算属性进行计算了');
    return 1;
});

effect(() => {
    // 假设这个是渲染函数，依赖了 sum 这个计算属性
    console.log('render', sum.value);
});

state.a = 100;

// const x = reactive({
//     a: 1,
//     b: 2,
// });
// watch(
//     () => x.a + x.b,
//     (newValue, oldValue) => {
//         console.log(`sum is ${newValue},last sum is ${oldValue}`);
//     },
//     {
//         immediate: false,
//     },
// );
// x.a++;
