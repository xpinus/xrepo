import{a2 as m,r as y,f as _,ab as p,q as c,t as x,y as o,K as u,I as d,a0 as s,F as b,u as v,ao as g}from"./chunks/framework.tQiMsDJj.js";const P={__name:"demoDefineProperty",setup(f){const l={text:1},e=y();Object.defineProperty(l,"text",{set(r){e.value.value=r,this.value=r},get(){return this.value}}),_(()=>{e.value.addEventListener("change",function(r){l.text=r.target.value})});function a(){l.text=""}return(r,t)=>{const n=p("x-button");return c(),x(b,null,[o("input",{ref_key:"input",ref:e},null,512),u(n,{onClick:a},{default:d(()=>t[0]||(t[0]=[s("清空")])),_:1})],64)}}},h=m(P,[["__scopeId","data-v-5d2c5ca0"]]),k={__name:"demoProxy",setup(f){const l={text:1},e=y(),a=new Proxy(l,{get:function(t,n){return console.log("get"),t[n]},set:(t,n,i)=>(t[n]!==i&&(console.log(`监听到${n}变化啦,值变为:${i}`),t[n]=i,e.value.value=i),!0)});_(()=>{e.value.addEventListener("change",function(t){a.text=t.target.value})});function r(){a.text=""}return(t,n)=>{const i=p("x-button");return c(),x(b,null,[o("input",{ref_key:"input",ref:e},null,512),u(i,{onClick:r},{default:d(()=>n[0]||(n[0]=[s("清空")])),_:1})],64)}}},j=m(k,[["__scopeId","data-v-268aca47"]]),w=`<script setup>
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
`,O=`<script setup>
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
`,$=JSON.parse('{"title":"请简单实现双向数据绑定mvvm","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/算法/经典手写/双向数据绑定/index.md","filePath":"knowledge-lib/js/算法/经典手写/双向数据绑定/index.md"}'),C={name:"knowledge-lib/js/算法/经典手写/双向数据绑定/index.md"},M=Object.assign(C,{setup(f){return(l,e)=>{const a=p("preview");return c(),x("div",null,[e[0]||(e[0]=o("h1",{id:"请简单实现双向数据绑定mvvm",tabindex:"-1"},[s("请简单实现双向数据绑定"),o("code",null,"mvvm"),s(),o("a",{class:"header-anchor",href:"#请简单实现双向数据绑定mvvm","aria-label":'Permalink to "请简单实现双向数据绑定`mvvm`"'},"​")],-1)),e[1]||(e[1]=o("h2",{id:"object-defineproperty",tabindex:"-1"},[s("Object.defineProperty "),o("a",{class:"header-anchor",href:"#object-defineproperty","aria-label":'Permalink to "Object.defineProperty"'},"​")],-1)),u(a,{code:v(w)},{default:d(()=>[u(h)]),_:1},8,["code"]),e[2]||(e[2]=o("h2",{id:"proxy实现",tabindex:"-1"},[s("proxy实现 "),o("a",{class:"header-anchor",href:"#proxy实现","aria-label":'Permalink to "proxy实现"'},"​")],-1)),u(a,{code:v(O)},{default:d(()=>[u(j)]),_:1},8,["code"]),e[3]||(e[3]=g('<h2 id="优劣对比" tabindex="-1">优劣对比 <a class="header-anchor" href="#优劣对比" aria-label="Permalink to &quot;优劣对比&quot;">​</a></h2><p>Proxy 的优势如下:</p><ul><li>Proxy 可以直接监听对象而非属性；</li><li>Proxy 可以直接监听数组的变化；</li><li>Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；</li><li>Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；</li><li>Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；</li></ul><p>Object.defineProperty 的优势如下:</p><ul><li>兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。</li></ul>',5))])}}});export{$ as __pageData,M as default};
