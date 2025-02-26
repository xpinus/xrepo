const str = 'abcde';

// 方案一
console.log(str.split('').reverse().join(''));

// 方案二
const res = Array.from(str).reduce((pre, cur) => {
    return cur + pre;
});

console.log(res);
