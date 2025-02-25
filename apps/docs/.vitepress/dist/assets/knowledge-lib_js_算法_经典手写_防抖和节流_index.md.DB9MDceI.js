import{a2 as g,q as f,t as b,W as w,ap as x,u as a,y as e,h,M as y,as as k,a0 as p,K as u,I as T,ab as m}from"./chunks/framework.tQiMsDJj.js";const E={class:"container"},R={class:"result"},j={__name:"debounceRef",setup(_){function d(r,l){let o=null;return function(...i){let s=this;o&&clearTimeout(o),o=setTimeout(()=>{r.apply(s,i)},l)}}function n(r,l=1e3){return k((o,i)=>{let s=r;const v=d(c=>{s=c,i()},l);return{get(){return o(),s},set(c){v(c)}}})}const t=n("");return(r,l)=>(f(),b("div",E,[w(e("input",{"onUpdate:modelValue":l[0]||(l[0]=o=>h(t)?t.value=o:null),type:"text"},null,512),[[x,a(t)]]),e("p",R,"输入："+y(a(t)),1)]))}},P=g(j,[["__scopeId","data-v-38bd8081"]]),N=`<script setup>
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
`,V=`/**
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
`,q=`/**
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
`,D=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/算法/经典手写/防抖和节流/index.md","filePath":"knowledge-lib/js/算法/经典手写/防抖和节流/index.md"}'),B={name:"knowledge-lib/js/算法/经典手写/防抖和节流/index.md"},I=Object.assign(B,{setup(_){return(d,n)=>{const t=m("run-script"),r=m("preview");return f(),b("div",null,[n[0]||(n[0]=e("h2",{id:"防抖",tabindex:"-1"},[p("防抖 "),e("a",{class:"header-anchor",href:"#防抖","aria-label":'Permalink to "防抖"'},"​")],-1)),n[1]||(n[1]=e("blockquote",null,[e("p",null,"仅执行一段时间内的最后一次操作")],-1)),u(t,{name:"普通的js防抖",code:a(V)},null,8,["code"]),n[2]||(n[2]=e("p",null,[e("strong",null,"vue3中使用自定义ref实现防抖")],-1)),u(r,{code:a(N)},{default:T(()=>[u(P)]),_:1},8,["code"]),n[3]||(n[3]=e("h2",{id:"节流",tabindex:"-1"},[p("节流 "),e("a",{class:"header-anchor",href:"#节流","aria-label":'Permalink to "节流"'},"​")],-1)),n[4]||(n[4]=e("blockquote",null,[e("p",null,"防抖动和节流本质是不一样的。防抖动是将多次执行变为最后一次执行，节流是将多次执行变成每隔一段时间执行")],-1)),u(t,{code:a(q)},null,8,["code"])])}}});export{D as __pageData,I as default};
