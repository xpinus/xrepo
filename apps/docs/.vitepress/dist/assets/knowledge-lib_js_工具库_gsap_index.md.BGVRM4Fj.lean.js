import{a as x}from"./chunks/theme.BBBzFzPf.js";import{p as f,q as d,t as c,y as p,K as t,I as e,a0 as s,a3 as g,ao as l,u as m,ac as k}from"./chunks/framework.Dt9YBBJv.js";const _={class:"container"},h={class:"tween-operations"},v=f({__name:"d1",setup(u){function i(){gsap.to(".box",{x:200})}function o(){gsap.from(".box",{x:-100,background:"pink"})}function r(){gsap.fromTo(".box",{x:-80,background:"blue"},{x:80,background:"green"})}function b(){gsap.set(".box",{x:-40,background:"blue"})}return(T,n)=>{const a=x;return d(),c("div",_,[p("div",h,[t(a,{onClick:i},{default:e(()=>n[0]||(n[0]=[s("to")])),_:1}),t(a,{onClick:o},{default:e(()=>n[1]||(n[1]=[s("from")])),_:1}),t(a,{onClick:r},{default:e(()=>n[2]||(n[2]=[s("fromTo")])),_:1}),t(a,{onClick:b},{default:e(()=>n[3]||(n[3]=[s("set")])),_:1})]),n[4]||(n[4]=p("div",{class:"box"},null,-1))])}}}),w=g(v,[["__scopeId","data-v-7bc30004"]]),S=`<script lang="ts" setup>
function to() {
    gsap.to('.box', { x: 200 }); // 在200-400间移动
}

function from() {
    gsap.from('.box', { x: -100, background: 'pink' });
}

function fromTo() {
    gsap.fromTo('.box', { x: -80, background: 'blue' }, { x: 80, background: 'green' });
}

function set() {
    gsap.set('.box', { x: -40, background: 'blue' });
}
<\/script>

<template>
    <div class="container">
        <div class="tween-operations">
            <x-button @click="to">to</x-button>
            <x-button @click="from">from</x-button>
            <x-button @click="fromTo">fromTo</x-button>
            <x-button @click="set">set</x-button>
        </div>
        <div class="box"></div>
    </div>
</template>

<style lang="less" scoped>
.container {
    width: 100%;
    height: 120px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tween-operations {
    display: flex;
    gap: 6px;
    margin-bottom: 10px;
}

.box {
    width: 80px;
    height: 80px;
    background-color: #00c918;
    border-radius: 8px;
}
</style>
`,y=JSON.parse('{"title":"GSAP","description":"","frontmatter":{"head":[["script",{"src":"https://cdn.bootcdn.net/ajax/libs/gsap/3.12.5/gsap.min.js"}]]},"headers":[],"relativePath":"knowledge-lib/js/工具库/gsap/index.md","filePath":"knowledge-lib/js/工具库/gsap/index.md"}'),C={name:"knowledge-lib/js/工具库/gsap/index.md"},j=Object.assign(C,{setup(u){return(i,o)=>{const r=k("preview");return d(),c("div",null,[o[0]||(o[0]=l('<h1 id="gsap" tabindex="-1">GSAP <a class="header-anchor" href="#gsap" aria-label="Permalink to &quot;GSAP&quot;">​</a></h1><p><a href="https://gsap.framer.wiki/" target="_blank" rel="noreferrer">https://gsap.framer.wiki/</a></p><p>GSAP是前端业内非常有名的一个动效库，有大量的优秀的网站都在使用它。它不仅能在原生JS的环境下使用，也能配合各种当前流行的框架进行使用。</p><p>通过使用它，非常多原本实现起来很有难度的交互动画效果，都能快速高效的实现。</p><h2 id="基础" tabindex="-1">基础 <a class="header-anchor" href="#基础" aria-label="Permalink to &quot;基础&quot;">​</a></h2><blockquote><p>Tween（补间动画是一种动画的类型，就是我们常见的两个状态之间的变化的动画方式，中间的变化过程都是计算机计算出来的，比如我们常见的匀速、缓入缓出动画就是Tween类型的动画。</p></blockquote>',6)),t(r,{name:"简单的tween动画",code:m(S)},{default:e(()=>[t(w)]),_:1},8,["code"]),o[1]||(o[1]=l("<p><strong>动画方法 Methods</strong></p><ul><li>to：就是让元素从当前状态变化到目标状态</li><li>from：有点像to方法的逆向变化，就是让元素从目标状态变化到当前状态</li><li>fromTo： 需要自己定义两个状态的数据，然后从前一个变化到后一个</li><li>set：直接设置成想要的状态，没有任何过度与动画效果。本质上就是duration为0的 .to 方法</li></ul><p><strong>目标元素（们）target</strong></p><p>GSAP在底层实际上是使用了document.querySelector( )去选择元素，所以你可以用任何css选择器进行元素的选择。或者你也可以直接传入一个DOM元素或者一个数组</p><p><strong>变化数据对象（variables）</strong></p><p>设置任意的你想要发生变化的属性和值，或者一些特殊的会影响动画过程的一些属性，比如duration（动画时长），onComplete（动画完成时触发事件）或者repeat（动画重复的次数）</p><blockquote><p>什么属性是可以变化的？</p></blockquote><p>GSAP基本上可以说是什么都能变：它没有一个清单规定什么能变，什么不能变。包括像CSS属性、自定义的对象属性，甚至CSS变量和复杂的字符串都可以！我们最常变化的属性其实是transform和opacity。</p>",8))])}}});export{y as __pageData,j as default};
