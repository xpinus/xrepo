import{a3 as b,q as p,t as f,W as T,ap as O,u as a,y as e,h as I,M,as as E,r as v,f as x,K as o,I as d,a0 as r,F as P,ao as y,ac as k}from"./chunks/framework.Dt9YBBJv.js";import{a as w}from"./chunks/theme.IAYrlGz0.js";const R=`// 实现
function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}

// 用例
(async () => {
    console.log(1);
    await sleep(1000);
    console.log(2);
})();
`,q=`function sleep(time) {\r
    let now = Date.now();\r
    while (Date.now() - now < time) {}\r
}\r
\r
console.log(1);\r
sleep(1000);\r
console.log(2);\r
`,S=`function add(arg1) {
    return function (arg2) {
        return arg1 + arg2;
    };
}

function one(operator) {
    if (operator) {
        return operator(1);
    }
    return 1;
}

function two(operator) {
    if (operator) {
        return operator(2);
    }
    return 2;
}

console.log(one(add(two()))); // 3

console.log(two(add(one()))); // 3
`,C=`function toTree(arr, pid) {
    return arr
        .filter((item) => item.pid === pid)
        .map((item) => {
            return { ...item, children: toTree(arr, item.id) };
        });
}

// 示例
const arr = [
    { id: 1, pid: 0 },
    { id: 2, pid: 0 },
    { id: 3, pid: 1 },
    { id: 4, pid: 2 },
    { id: 5, pid: 3 },
];
console.log(toTree(arr, 0));
`,A=`function toTree(arr) {
    const map = {};

    for (const item of arr) {
        // 创建自己和父级的关系
        if (map.hasOwnProperty(item.pid)) {
            map[item.pid].push(item);
        } else {
            map[item.pid] = [item];
        }

        // 创建自己和子级的关系
        if (map.hasOwnProperty(item.id)) {
            item.children = map[item.id];
        } else {
            item.children = [];
            map[item.id] = item.children;
        }
    }

    return map[0]; // 顶级pid下就是树的入口
}

const arr = [
    { id: 1, pid: 0 },
    { id: 2, pid: 0 },
    { id: 3, pid: 1 },
    { id: 4, pid: 2 },
    { id: 5, pid: 3 },
];
console.log(JSON.stringify(toTree(arr)));
`,_=`function myFlat(arr) {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? myFlat(cur) : [cur]);
    }, []);
}

// 用例
const arr = [1, [2, 3, [4, [5]]]];
console.log(arr.flat(Infinity)); // Array方法
console.log(myFlat(arr));
`,B=`const arr = [1, {\r
    a: 2,\r
    b: 3,\r
}, {\r
    a: 2,\r
    b: 3,\r
}, 1, {c: undefined}, {d: undefined}]\r
\r
function unique(arr) {\r
    const result = [];\r
\r
    outer: for(const item of arr) {\r
        for(const r of result) {\r
            if(isEqual(item, r)) {\r
                continue outer;\r
            }\r
        }\r
\r
        result.push(item);\r
    }\r
\r
    return result;\r
}\r
\r
function isEqual(a, b) {\r
    if(isPrimitive(a) || isPrimitive(b)) {\r
        return Object.is(a, b);\r
    }\r
\r
    const entriesA = Object.entries(a);\r
    const entriesB = Object.entries(b);\r
\r
    if(entriesA.length !== entriesB.length) {\r
        return false;\r
    }\r
\r
    for(const [key, value] of entriesA) {\r
        if(!isEqual(value, b[key]) || !b.hasOwnProperty(key)) {\r
            return false;\r
        }\r
    }\r
\r
    return true\r
}\r
\r
// 判断是否为原始类型\r
function isPrimitive(value) {\r
    return value !== Object(value)\r
}\r
\r
console.log(unique(arr));`,D=`const arr = [1, 2, 3, 4, 5];\r
\r
function shuffle(arr) {\r
    for (let i = 0; i < arr.length; i++) {\r
        const target = Math.floor(Math.random() * i);\r
\r
        [arr[i], arr[target]] = [arr[target], arr[i]];\r
    }\r
\r
    return arr;\r
}\r
\r
shuffle(arr);\r
console.log(arr);\r
`,z=`// add
function add() {
    let args = Array.from(arguments);

    let inner = function () {
        args.push(...arguments);
        return inner;
    };

    // 有问题
    inner.toString = function () {
        return args.reduce((pre, cur) => pre + cur);
    };

    return inner;
}

let r1 = add(1, 2, 3)(4);
console.log(r1);
console.log(r1.toString());

const r2 = add(1)(2)(3)(4);
console.log(r2.toString());
`,F=`function isPrimitive(target) {
    return target !== Object(target); // Object()参数如果是引用数据会原样返回
}

function deepClone(target, cache = new WeakMap()) {
    if (isPrimitive(target)) return target;

    if (cache.has(target)) return cache.get(target);
    const newObj = new target.constructor();
    cache.set(target, newObj);

    if (newObj instanceof Function) return newObj; // Function下去遍历会有而外的属性，这里直接返回

    for (const key of Reflect.ownKeys(target)) {
        newObj[key] = deepClone(target[key], cache);
    }

    return newObj;
}

// 测试：
const test = {
    name: 'xyf',
    age: 16,
    children: {
        name: 'ch1',
        age: 0,
    },
    f: [1, 2, 3],
    others: undefined,
    action: function () {
        console.log(this.name);
    },
    // s: new Set([1, 2, 3]),   // Set Map还是要额外处理
};
test.children.circle = test; // 循环引用

const cloneObj = deepClone(test);

console.log(cloneObj.children === test.children); // false
test.action();
// console.log(cloneObj === cloneObj.children.circle);
`,L=`const student1 = {
    name: '张三',
    hello() {
        console.log('hello');
    },
    score: [{ key: '数学', value: '99' }],
};

try {
    console.log(structuredClone(student1)); // 报错：不能克隆函数
} catch (err) {
    console.warn(err);
}

const student2 = {
    name: '李四',
    score: [{ key: '数学', value: '59' }],
};

console.log(structuredClone(student2));
`,U={class:"container"},N={class:"result"},$={__name:"debounceRef",setup(h){function c(s,i){let l=null;return function(...u){let m=this;l&&clearTimeout(l),l=setTimeout(()=>{s.apply(m,u)},i)}}function n(s,i=1e3){return E((l,u)=>{let m=s;const j=c(g=>{m=g,u()},i);return{get(){return l(),m},set(g){j(g)}}})}const t=n("");return(s,i)=>(p(),f("div",U,[T(e("input",{"onUpdate:modelValue":i[0]||(i[0]=l=>I(t)?t.value=l:null),type:"text"},null,512),[[O,a(t)]]),e("p",N,"输入："+M(a(t)),1)]))}},V=b($,[["__scopeId","data-v-f18d6241"]]),J=`<script setup>
import { ref, customRef } from 'vue';

function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
        let context = this;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };
}

function debounceRef(value, delay = 1000) {
    return customRef((track, trigger) => {
        let _value = value;

        const _debounce = debounce((val) => {
            _value = val;
            trigger();
        }, delay);

        return {
            get() {
                track();
                return _value;
            },
            set(val) {
                _debounce(val);
            },
        };
    });
}

const text = debounceRef('');
<\/script>

<template>
    <div class="container">
        <input
            v-model="text"
            type="text"
        />
        <p class="result">输入：{{ text }}</p>
    </div>
</template>

<style scoped>
.container {
    width: 80%;
    margin: 1em auto;
}
.result {
    color: #333;
}
.container input {
    width: 100%;
    height: 30px;
    border: 1px solid #333;
}
</style>
`,W=`/**
 * 防抖函数，返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 * @param  {function} func        回调函数
 * @param  {number}   wait        表示时间窗口的间隔
 * @return {function}             返回客户调用函数
 */
function debounce(func, wait) {
    let timer = null;

    return function (...args) {
        let context = this;

        clearTimeout(timer);

        // 通过返回一个promise来拿到执行结果
        return new Promise((resolve, reject) => {
            timer = setTimeout(function () {
                const result = func.apply(context, args);
                resolve(result);
            }, wait);
        });
    };
}

// 测试：
function eat(fruit) {
    console.log('eat ' + fruit);

    return fruit + ' taste good';
}

const slowEat = debounce(eat, 100);

let result = null;
result = slowEat('apple');
result = slowEat('apple pie'); // 只会执行最后一次

result && result.then((res) => console.log(res)); // 打印执行结果
`,K=`/**
 * 节流函数，返回函数连续调用时，func 执行频率限定为 次 / wait
 * @param  {function}   func      回调函数
 * @param  {number}     wait      表示时间窗口的间隔
 */
function throttle(func, wait) {
    let timer = null;
    return function (...args) {
        if (timer) return;

        timer = setTimeout(() => {
            func.apply(this, args);
            timer = null;
        }, wait);
    };
}

// 测试：
function eat(fruit) {
    console.log('eat ' + fruit);
}

const slowEat = throttle(eat, 100);

slowEat('apple');
slowEat('apple pie'); // 高频忽略
setTimeout(() => {
    result = slowEat('banana');
}, 500);
`,H=`function getParams(url) {
    const res = {};
    if (url.includes('?')) {
        const str = url.split('?')[1];
        const arr = str.split('&');
        arr.forEach((item) => {
            const key = item.split('=')[0];
            const val = item.split('=')[1];
            res[key] = decodeURIComponent(val); // 解码
        });
    }
    return res;
}

// 测试
const url = 'https://cn.bing.com/search?q=%E5%B2%9B%E5%B1%BF%E9%97%AE%E9%A2%98&PC=U316&FORM=CHROMN';
const user = getParams(url);
console.log(user);
`,G=`const paramsStr = 'q=%E5%B2%9B%E5%B1%BF%E9%97%AE%E9%A2%98&PC=U316&FORM=CHROMN';
const urlSearchParams = new URLSearchParams(paramsStr);
const res = Object.fromEntries(urlSearchParams.entries());
console.log(res);
`,Q=`class LRU {
    #map = new Map();
    #limit = 3;

    constructor(limit = 3) {
        this.#limit = limit;
    }

    get(key) {
        if (!this.#map.has(key)) {
            return null;
        }

        const value = this.#map.get(key);
        this.#map.delete(key);
        this.#map.set(key, value);

        return value;
    }

    set(key, value) {
        if (this.#map.has(key)) {
            this.#map.delete(key);
        }

        this.#map.set(key, value);

        if (this.#map.size > this.#limit) {
            this.#map.delete(this.#map.keys().next().value);
        }
    }

    log() {
        console.log(this.#map);
    }
}

const cache = new LRU();

cache.set('a', 1);
cache.set('b', 2);
cache.set('c', 3); // {c: 3, b: 2, a: 1}
cache.get('a');
cache.set('d', 4);

cache.log();
`,X=`class MemoMap {\r
    #map = new Map();\r
    #weakMap = new WeakMap();\r
\r
    _isObject(key) {\r
        return typeof key === 'object' && key !== null;\r
    }\r
\r
    has(key) {\r
        if(this._isObject(key)) {\r
            return this.#weakMap.has(key)\r
        }else {\r
            return this.#map.has(key);\r
        }\r
    }\r
\r
    get(key) {\r
        if(this._isObject(key)) {\r
            return this.#weakMap.get(key);\r
        }else {\r
            return this.#map.get(key);\r
        }\r
    }\r
\r
    set(key, value) {\r
        if(this._isObject(key)) {\r
            this.#weakMap.set(key, value);\r
        }else {\r
            this.#map.set(key, value);\r
        }\r
    }\r
}\r
\r
function memoize(func, resolver) {\r
    function memoized(...args) {\r
        const key = resolver ? resolver(...args) : args[0];\r
        if(memoized.cache.has(key)){\r
            return memoized.cache.get(key);\r
        }\r
        const value = func(...args);\r
        memoized.cache.set(key, value);\r
\r
        return value\r
    }\r
    memoized.cache = new MemoMap();\r
    return memoized\r
}\r
\r
var object = { a:1, b:2 };\r
\r
var values = memoize((obj) => Object.values(obj));\r
console.log(values(object)); // [1,2]\r
\r
object.a = 3;\r
console.log(values(object)); // [1,2]\r
\r
values.cache.set(object, ['a', 'b']) // 允许手动更新缓存\r
console.log(values(object)) // ['a', 'b']`,Y=`/**\r
 * 大整数相加\r
 * @param{string} a\r
 * @param{string} b\r
 */\r
function sum(a, b) {\r
    let len = Math.max(a.length, b.length)\r
    a = a.padStart(len, '0')\r
    b = b.padStart(len, '0')\r
\r
    let res = ''\r
    let carry = 0;\r
    for (let i = len - 1; i >= 0; i--) {\r
        const sum = parseInt(a[i]) + parseInt(b[i]) + carry;\r
        carry = Math.floor(sum / 10);\r
        res = sum % 10  + res;\r
    }\r
\r
    if (carry === 1) {\r
        res = '1' + res;\r
    }\r
\r
    console.log(String(BigInt(a) + BigInt(b)))\r
\r
    return res;\r
}\r
\r
console.log(sum('12414637547634', '78956346436'))`,Z=`// 给fetch添加超时功能\r
// hoc高阶函数\r
function createFetchWithTimeout(timeout) {\r
    return function (url, options) {\r
        const controller = new AbortController();\r
        const id = setTimeout(() => controller.abort(), timeout);\r
        return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(id));\r
    }\r
}`,nn=`// 任务执行的洋葱模型\r
class TaskPro {\r
    _tasks = []\r
    _isRuning = false;\r
    _currentTaskIndex = 0;\r
\r
\r
    addTask(task) {\r
        this._tasks.push(task)\r
    }\r
\r
    async run() {\r
        if(this._isRuning) return;\r
        this._isRuning = true;\r
\r
        await this._runTask()\r
    }\r
\r
    async _runTask() {\r
        if(this._currentTaskIndex >= this._tasks.length) {\r
            this._isRuning = false;\r
            this._currentTaskIndex = 0;\r
            this._tasks = [];\r
            return;\r
        }\r
        const index = this._currentTaskIndex;\r
        const task = this._tasks[index];\r
        await task(this._next.bind(this));\r
\r
        if(index === this._currentTaskIndex) {\r
            await this._next();\r
        }\r
    }\r
\r
    async _next() {\r
        this._currentTaskIndex++;\r
        this._runTask();\r
    }\r
}\r
\r
\r
// 用例\r
const task = new TaskPro();\r
task.addTask(async (next) => {\r
    console.log('start')\r
    console.log('1')\r
    await next();\r
    console.log('end')\r
})\r
task.addTask(() => {\r
    console.log('2')\r
})\r
task.addTask(() => {\r
    console.log('3')\r
})\r
\r
task.run();// start 1 2 3 end`,en=`const str = 'abcde';\r
\r
// 方案一\r
console.log(str.split('').reverse().join(''));\r
\r
// 方案二\r
const res = Array.from(str).reduce((pre, cur) => {\r
    return cur + pre;\r
});\r
\r
console.log(res);\r
`,rn=`class TimeoutCtrl {\r
    constructor(time) {\r
        this.initialTime = time; // 初始时间\r
        this.remainingTime = time; // 剩余时间\r
        this.startTime = null; // 开始时间\r
        this.paused = true; // 初始状态为暂停\r
        this.timerId = null; // 定时器 ID\r
    }\r
\r
    // 开始或继续倒计时\r
    play() {\r
        if (this.paused) {\r
            this.startTime = Date.now(); // 记录开始时间\r
            this.paused = false;\r
            this._run();\r
        }\r
    }\r
\r
    // 暂停倒计时\r
    pause() {\r
        if (!this.paused) {\r
            this.paused = true;\r
            clearTimeout(this.timerId); // 清除定时器\r
            this.initialTime -= Date.now() - this.startTime; // 更新剩余的初始时间时间\r
        }\r
    }\r
\r
    // 内部运行方法\r
    _run() {\r
        if (this.paused) return;\r
\r
        const now = Date.now();\r
        const delta = now - this.startTime; // 计算已经过去的时间\r
        this.remainingTime = this.initialTime - delta; // 更新剩余时间\r
\r
        if (this.remainingTime > 0) {\r
            console.log(\`剩余时间：\${this.remainingTime}ms\`);\r
            this.timerId = setTimeout(() => this._run(), 100); // 每 100ms 检查一次\r
        } else {\r
            console.log('时间截止');\r
            this.remainingTime = 0; // 确保剩余时间不为负数\r
        }\r
    }\r
}\r
\r
// 测试\r
const timer = new TimeoutCtrl(60000); // 60 秒倒计时\r
timer.play();\r
\r
// 10 秒后暂停\r
setTimeout(() => {\r
    timer.pause();\r
    console.log('已暂停');\r
}, 10000);\r
\r
// 20 秒后继续\r
setTimeout(() => {\r
    timer.play();\r
    console.log('已继续');\r
}, 20000);\r
`,tn=`function getSequence(arr) {
    const p = arr.slice(); // 复制原数组，用于构建反向链表
    const result = [0]; // 结果，为最长子序列值的索引
    let i, j, u, v, c;
    const len = arr.length;
    for (i = 0; i < len; i++) {
        // 遍历原数组
        const arrI = arr[i]; // 当前值
        if (arrI !== 0) {
            j = result[result.length - 1]; // 获取最后一位保存的索引值
            if (arr[j] < arrI) {
                p[i] = j; // 记录反向链表，指向结果序列最后一位
                result.push(i); // 把i追加在结果序列末尾
                continue;
            }
            // 当前值比result末尾索引对应的值小时
            u = 0;
            v = result.length - 1;
            while (u < v) {
                //  二分查找
                c = (u + v) >> 1;
                if (arr[result[c]] < arrI) {
                    u = c + 1;
                } else {
                    v = c;
                }
            }
            if (arrI < arr[result[u]]) {
                // 找到result中第一位比当前值大的
                if (u > 0) {
                    p[i] = result[u - 1]; // 记录反向链表，指向结果序列前一位
                }
                result[u] = i; // 用当前索引值i，替换原来的值
            }
        }
    }
    u = result.length;
    v = result[u - 1];
    while (u-- > 0) {
        // 从后往前遍历，回溯修正结果序列
        result[u] = v;
        v = p[v];
    }
    return result;
}

console.log(getSequence([4, 5, 1, 2, 7, 3, 6, 9]));
`,on={__name:"demoDefineProperty",setup(h){const c={text:1},n=v();Object.defineProperty(c,"text",{set(s){n.value.value=s,this.value=s},get(){return this.value}}),x(()=>{n.value.addEventListener("change",function(s){c.text=s.target.value})});function t(){c.text=""}return(s,i)=>{const l=w;return p(),f(P,null,[e("input",{ref_key:"input",ref:n},null,512),o(l,{onClick:t},{default:d(()=>i[0]||(i[0]=[r("清空")])),_:1})],64)}}},an=b(on,[["__scopeId","data-v-0bc38d04"]]),ln={__name:"demoProxy",setup(h){const c={text:1},n=v(),t=new Proxy(c,{get:function(i,l){return console.log("get"),i[l]},set:(i,l,u)=>(i[l]!==u&&(console.log(`监听到${l}变化啦,值变为:${u}`),i[l]=u,n.value.value=u),!0)});x(()=>{n.value.addEventListener("change",function(i){t.text=i.target.value})});function s(){t.text=""}return(i,l)=>{const u=w;return p(),f(P,null,[e("input",{ref_key:"input",ref:n},null,512),o(u,{onClick:s},{default:d(()=>l[0]||(l[0]=[r("清空")])),_:1})],64)}}},sn=b(ln,[["__scopeId","data-v-514abf38"]]),un=`<script setup>
import { onMounted, ref } from 'vue';

const data = {
    text: 1,
};
const input = ref();
Object.defineProperty(data, 'text', {
    set(value) {
        input.value.value = value;
        this.value = value;
    },
    get() {
        return this.value;
    },
});

onMounted(() => {
    input.value.addEventListener('change', function (e) {
        data.text = e.target.value;
    });
});

function clear() {
    data.text = '';
}
<\/script>

<template>
    <input ref="input" />
    <x-button @click="clear">清空</x-button>
</template>

<style scoped>
input {
    color: #1a1d24;
    border: 1px solid #292d35;
    margin-right: 20px;
}
</style>
`,cn=`<script setup>
import { onMounted, ref } from 'vue';

const data = {
    text: 1,
};
const input = ref();
const dataProxy = new Proxy(data, {
    get: function (target, propkey) {
        console.log('get');
        return target[propkey];
    },
    set: (target, propkey, value) => {
        // input.value = value;
        if (target[propkey] !== value) {
            console.log(\`监听到\${propkey}变化啦,值变为:\${value}\`);
            target[propkey] = value;
            input.value.value = value;
        }

        return true;
    },
});

onMounted(() => {
    input.value.addEventListener('change', function (e) {
        dataProxy.text = e.target.value;
    });
});

function clear() {
    dataProxy.text = '';
}
<\/script>

<template>
    <input ref="input" />
    <x-button @click="clear">清空</x-button>
</template>

<style scoped>
input {
    color: #1a1d24;
    border: 1px solid #292d35;
    margin-right: 20px;
}
</style>
`,fn=JSON.parse('{"title":"经典手写","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/算法/经典手写/index.md","filePath":"knowledge-lib/js/算法/经典手写/index.md"}'),dn={name:"knowledge-lib/js/算法/经典手写/index.md"},hn=Object.assign(dn,{setup(h){return(c,n)=>{const t=k("run-script"),s=k("preview");return p(),f("div",null,[n[9]||(n[9]=e("h1",{id:"经典手写",tabindex:"-1"},[r("经典手写 "),e("a",{class:"header-anchor",href:"#经典手写","aria-label":'Permalink to "经典手写"'},"​")],-1)),n[10]||(n[10]=e("h2",{id:"sleep延时函数",tabindex:"-1"},[r("sleep延时函数 "),e("a",{class:"header-anchor",href:"#sleep延时函数","aria-label":'Permalink to "sleep延时函数"'},"​")],-1)),o(t,{name:"基于promise",code:a(R)},null,8,["code"]),o(t,{name:"基于Date.now()",code:a(q)},null,8,["code"]),n[11]||(n[11]=e("h2",{id:"函数式编程",tabindex:"-1"},[r("函数式编程 "),e("a",{class:"header-anchor",href:"#函数式编程","aria-label":'Permalink to "函数式编程"'},"​")],-1)),o(t,{name:"实现下面函数",code:a(S)},null,8,["code"]),n[12]||(n[12]=e("h2",{id:"扁平数组转树",tabindex:"-1"},[r("扁平数组转树 "),e("a",{class:"header-anchor",href:"#扁平数组转树","aria-label":'Permalink to "扁平数组转树"'},"​")],-1)),n[13]||(n[13]=e("ul",null,[e("li",null,"法1 简单易懂，性能能差")],-1)),o(t,{code:a(C)},null,8,["code"]),n[14]||(n[14]=e("ul",null,[e("li",null,"法2 一次遍历")],-1)),o(t,{code:a(A)},null,8,["code"]),n[15]||(n[15]=e("h2",{id:"数组扁平化",tabindex:"-1"},[r("数组扁平化 "),e("a",{class:"header-anchor",href:"#数组扁平化","aria-label":'Permalink to "数组扁平化"'},"​")],-1)),o(t,{code:a(_)},null,8,["code"]),n[16]||(n[16]=e("h2",{id:"数组去重",tabindex:"-1"},[r("数组去重 "),e("a",{class:"header-anchor",href:"#数组去重","aria-label":'Permalink to "数组去重"'},"​")],-1)),n[17]||(n[17]=e("blockquote",null,[e("p",null,"两个属性相同的对象也认为是相同的")],-1)),o(t,{code:a(B)},null,8,["code"]),n[18]||(n[18]=e("h2",{id:"数组打乱顺序",tabindex:"-1"},[r("数组打乱顺序 "),e("a",{class:"header-anchor",href:"#数组打乱顺序","aria-label":'Permalink to "数组打乱顺序"'},"​")],-1)),o(t,{code:a(D)},null,8,["code"]),n[19]||(n[19]=e("blockquote",null,[e("p",null,[r("为什么不用sort, 如"),e("code",null,"arr.sort((a, b) => Math.random() - 0.5)")]),e("p",null,"sort算法会导致程序不稳定，极端条件下可能不会打乱顺序")],-1)),n[20]||(n[20]=e("h2",{id:"柯里化",tabindex:"-1"},[r("柯里化 "),e("a",{class:"header-anchor",href:"#柯里化","aria-label":'Permalink to "柯里化"'},"​")],-1)),o(t,{code:a(z)},null,8,["code"]),n[21]||(n[21]=y('<h2 id="深浅拷贝" tabindex="-1">深浅拷贝 <a class="header-anchor" href="#深浅拷贝" aria-label="Permalink to &quot;深浅拷贝&quot;">​</a></h2><h3 id="浅拷贝" tabindex="-1">浅拷贝 <a class="header-anchor" href="#浅拷贝" aria-label="Permalink to &quot;浅拷贝&quot;">​</a></h3><ul><li>展开运算符<code>...</code></li><li><code>Object.assign</code></li></ul><h3 id="深拷贝" tabindex="-1">深拷贝 <a class="header-anchor" href="#深拷贝" aria-label="Permalink to &quot;深拷贝&quot;">​</a></h3>',4)),e("ul",null,[n[6]||(n[6]=e("li",null,[r("可以通过 "),e("code",null,"JSON.parse(JSON.stringify(object))"),r(" 来解决 "),e("ul",null,[e("li",null,[r("会忽略 "),e("code",null,"undefined"),r("和函数")]),e("li",null,"不能解决循环引用的对象"),e("li",null,"将Date对象转换为字符串")])],-1)),e("li",null,[n[0]||(n[0]=r("第三方库lodash, 递归拷贝")),o(t,{code:a(F)},null,8,["code"])]),e("li",null,[n[5]||(n[5]=r("structuredClone() API 结构化克隆算法 ")),e("ul",null,[n[2]||(n[2]=e("li",null,"core-js 已经支持 structuredClone 的 polyfill",-1)),n[3]||(n[3]=e("li",null,"是浏览器提供的原生API，内部实现已经处理了许多复杂的细节和边缘情况，如循环引用、嵌套对象等，性能更好",-1)),n[4]||(n[4]=e("li",null,"可以用于跨线程或跨工作线程的数据传输",-1)),e("li",null,[n[1]||(n[1]=r("不支持拷贝某些复杂类型，如 Function、Dom节点、及对象上的一些特殊参数getter/setter/原型链等")),o(t,{code:a(L)},null,8,["code"])])])])]),n[22]||(n[22]=e("h2",{id:"防抖",tabindex:"-1"},[r("防抖 "),e("a",{class:"header-anchor",href:"#防抖","aria-label":'Permalink to "防抖"'},"​")],-1)),n[23]||(n[23]=e("blockquote",null,[e("p",null,"仅执行一段时间内的最后一次操作")],-1)),o(t,{name:"普通的js防抖",code:a(W)},null,8,["code"]),n[24]||(n[24]=e("p",null,[e("strong",null,"vue3中使用自定义ref实现防抖")],-1)),o(s,{code:a(J)},{default:d(()=>[o(V)]),_:1},8,["code"]),n[25]||(n[25]=e("h2",{id:"节流",tabindex:"-1"},[r("节流 "),e("a",{class:"header-anchor",href:"#节流","aria-label":'Permalink to "节流"'},"​")],-1)),n[26]||(n[26]=e("blockquote",null,[e("p",null,"防抖动和节流本质是不一样的。防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行")],-1)),o(t,{code:a(K)},null,8,["code"]),n[27]||(n[27]=e("h2",{id:"解析url中的参数",tabindex:"-1"},[r("解析URL中的参数 "),e("a",{class:"header-anchor",href:"#解析url中的参数","aria-label":'Permalink to "解析URL中的参数"'},"​")],-1)),e("ul",null,[e("li",null,[n[7]||(n[7]=r("法1 浏览器API")),o(t,{code:a(H)},null,8,["code"])]),e("li",null,[n[8]||(n[8]=r("法2")),o(t,{code:a(G)},null,8,["code"])])]),n[28]||(n[28]=e("h2",{id:"双向数据绑定mvvm",tabindex:"-1"},[r("双向数据绑定"),e("code",null,"mvvm"),r(),e("a",{class:"header-anchor",href:"#双向数据绑定mvvm","aria-label":'Permalink to "双向数据绑定`mvvm`"'},"​")],-1)),n[29]||(n[29]=e("h3",{id:"object-defineproperty",tabindex:"-1"},[r("Object.defineProperty "),e("a",{class:"header-anchor",href:"#object-defineproperty","aria-label":'Permalink to "Object.defineProperty"'},"​")],-1)),o(s,{code:a(un)},{default:d(()=>[o(an)]),_:1},8,["code"]),n[30]||(n[30]=e("h3",{id:"proxy实现",tabindex:"-1"},[r("proxy实现 "),e("a",{class:"header-anchor",href:"#proxy实现","aria-label":'Permalink to "proxy实现"'},"​")],-1)),o(s,{code:a(cn)},{default:d(()=>[o(sn)]),_:1},8,["code"]),n[31]||(n[31]=y('<h3 id="优劣对比" tabindex="-1">优劣对比 <a class="header-anchor" href="#优劣对比" aria-label="Permalink to &quot;优劣对比&quot;">​</a></h3><p>Proxy 的优势如下:</p><ul><li>Proxy 可以直接监听对象而非属性；</li><li>Proxy 可以直接监听数组的变化；</li><li>Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；</li><li>Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；</li><li>Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；</li></ul><p>Object.defineProperty 的优势如下:</p><ul><li>兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。</li></ul><h2 id="lru最久未使用队列" tabindex="-1">LRU最久未使用队列 <a class="header-anchor" href="#lru最久未使用队列" aria-label="Permalink to &quot;LRU最久未使用队列&quot;">​</a></h2>',6)),o(t,{code:a(Q)},null,8,["code"]),n[32]||(n[32]=e("h2",{id:"memoize可记忆函数",tabindex:"-1"},[r("memoize可记忆函数 "),e("a",{class:"header-anchor",href:"#memoize可记忆函数","aria-label":'Permalink to "memoize可记忆函数"'},"​")],-1)),o(t,{code:a(X)},null,8,["code"]),n[33]||(n[33]=e("h2",{id:"大数相加",tabindex:"-1"},[r("大数相加 "),e("a",{class:"header-anchor",href:"#大数相加","aria-label":'Permalink to "大数相加"'},"​")],-1)),o(t,{code:a(Y)},null,8,["code"]),n[34]||(n[34]=e("h2",{id:"请求超时取消",tabindex:"-1"},[r("请求超时取消 "),e("a",{class:"header-anchor",href:"#请求超时取消","aria-label":'Permalink to "请求超时取消"'},"​")],-1)),o(t,{code:a(Z)},null,8,["code"]),n[35]||(n[35]=e("h2",{id:"任务链",tabindex:"-1"},[r("任务链 "),e("a",{class:"header-anchor",href:"#任务链","aria-label":'Permalink to "任务链"'},"​")],-1)),o(t,{code:a(nn)},null,8,["code"]),n[36]||(n[36]=e("h2",{id:"反转字符串",tabindex:"-1"},[r("反转字符串 "),e("a",{class:"header-anchor",href:"#反转字符串","aria-label":'Permalink to "反转字符串"'},"​")],-1)),o(t,{code:a(en)},null,8,["code"]),n[37]||(n[37]=e("h2",{id:"可暂停的倒计时",tabindex:"-1"},[r("可暂停的倒计时 "),e("a",{class:"header-anchor",href:"#可暂停的倒计时","aria-label":'Permalink to "可暂停的倒计时"'},"​")],-1)),o(t,{code:a(rn)},null,8,["code"]),n[38]||(n[38]=e("h2",{id:"最长递增子序列",tabindex:"-1"},[r("最长递增子序列 "),e("a",{class:"header-anchor",href:"#最长递增子序列","aria-label":'Permalink to "最长递增子序列"'},"​")],-1)),n[39]||(n[39]=e("blockquote",null,[e("p",null,[r("思路：贪心算法 + 二分查找 + 反向链表 动态规划 + 贪心算法 + 二分查找 + 回溯结合 "),e("a",{href:"https://segmentfault.com/a/1190000039838442",target:"_blank",rel:"noreferrer"},"https://segmentfault.com/a/1190000039838442")])],-1)),o(t,{code:a(tn)},null,8,["code"])])}}});export{fn as __pageData,hn as default};
