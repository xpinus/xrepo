import{a2 as v,r as _,S as b,q as g,t as u,y as l,O as w,u as p,ao as P,K as c,I as h,a0 as y,ab as k}from"./chunks/framework.tQiMsDJj.js";const A={class:"container"},I={__name:"demo1",setup(m){let i=_(),e=b({left:0,top:0}),a=0,n=0,t=0,o=0;function d(r){t=r.pageX,o=r.pageY,n=e.top,a=e.left,console.log("cat开始移动")}function x(r){let s=r.pageX,f=r.pageY;s===0&&f===0||(s-=t,f-=o,e.left=a+s,e.top=n+f)}function D(r){console.log("cat源对象拖动结束")}return(r,s)=>(g(),u("div",A,[s[0]||(s[0]=l("h3",null,"随着鼠标拖动而移动的小猫咪",-1)),l("div",{class:"target",ref_key:"cat",ref:i,style:w({left:p(e).left+"px",top:p(e).top+"px"}),draggable:"true",onDragstart:d,onDrag:x,onDragend:D},null,36)]))}},R=v(I,[["__scopeId","data-v-f234646e"]]),T=`<script setup>
import { ref, reactive } from 'vue';

let cat = ref();
let catPosition = reactive({
    left: 0,
    top: 0,
});
let rawLeft = 0;
let rawTop = 0;
let offsetX = 0; // 记录拖拽过程中的偏移
let offsetY = 0;

function onDragStart(e) {
    offsetX = e.pageX;
    offsetY = e.pageY;
    rawTop = catPosition.top;
    rawLeft = catPosition.left;
    console.log('cat开始移动');
}

function onDrag(e) {
    let x = e.pageX;
    let y = e.pageY;
    if (x === 0 && y === 0) {
        //不处理最后一刻x,y都为0 的情景
        return;
    }
    x -= offsetX;
    y -= offsetY;
    catPosition.left = rawLeft + x;
    catPosition.top = rawTop + y;
}

function onDragEnd(e) {
    console.log('cat源对象拖动结束');
}
<\/script>

<template>
    <div class="container">
        <h3>随着鼠标拖动而移动的小猫咪</h3>
        <div
            class="target"
            ref="cat"
            :style="{
                left: catPosition.left + 'px',
                top: catPosition.top + 'px',
            }"
            draggable="true"
            @dragstart="onDragStart"
            @drag="onDrag"
            @dragend="onDragEnd"
        ></div>
    </div>
</template>

<style scoped>
h3 {
    user-select: none;
}
.container {
    margin: 10px auto;
    width: 100%;
    height: 400px;
    position: relative;
}

.target {
    position: absolute;
    width: 120px;
    height: 120px;
    background: url('https://pic2.zhimg.com/v2-9d3619857f65f66fe0163f84481b0d38_r.jpg?source=1940ef5c') no-repeat center / 100%;
}
</style>
`,L={class:"container"},S={__name:"demo2",setup(m){const i=_();function e(n){console.log(n),n.preventDefault()}function a(n){const t=n.dataTransfer.files[0],o=new FileReader;o.readAsDataURL(t),o.onload=function(){console.log("读取文件完成"),console.log(o.result);const d=new Image;d.src=o.result,i.value.appendChild(d)}}return document.ondrop=function(n){n.preventDefault()},document.ondragover=function(n){n.preventDefault()},(n,t)=>(g(),u("div",L,[t[0]||(t[0]=l("h1",null,"拖放API的扩展知识",-1)),t[1]||(t[1]=l("h3",null,"请拖动您的照片到下方方框区域",-1)),l("div",{ref_key:"dragArea",ref:i,id:"drag-area",onDragover:e,onDrop:a},null,544)]))}},X=v(S,[["__scopeId","data-v-b2c22594"]]),Y=`<script setup>
import { ref } from 'vue';

const dragArea = ref();

function onDragOver(e) {
    console.log(e);
    e.preventDefault();
}

function onDrop(e) {
    const file = e.dataTransfer.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
        console.log('读取文件完成');
        console.log(fileReader.result);
        const img = new Image();
        img.src = fileReader.result;
        dragArea.value.appendChild(img);
    };
}

document.ondrop = function (e) {
    e.preventDefault();
};
document.ondragover = function (e) {
    e.preventDefault();
};
<\/script>

<template>
    <div class="container">
        <h1>拖放API的扩展知识</h1>
        <h3>请拖动您的照片到下方方框区域</h3>
        <div
            ref="dragArea"
            id="drag-area"
            @dragover="onDragOver"
            @drop="onDrop"
        ></div>
    </div>
</template>

<style scoped>
.container {
    text-align: center;
}

h1,
h2,
h3,
h4 {
    user-select: none;
}

#drag-area {
    border: 1px solid #aaa;
    border-radius: 3px;
    padding: 10px;
    margin: 10px;
    min-height: 400px;
}
</style>
`,C=JSON.parse('{"title":"Drag API","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/html&css/HTML/拖拽/index.md","filePath":"knowledge-lib/html&css/HTML/拖拽/index.md"}'),q={name:"knowledge-lib/html&css/HTML/拖拽/index.md"},O=Object.assign(q,{setup(m){return(i,e)=>{const a=k("preview");return g(),u("div",null,[e[0]||(e[0]=P('<h1 id="drag-api" tabindex="-1">Drag API <a class="header-anchor" href="#drag-api" aria-label="Permalink to &quot;Drag API&quot;">​</a></h1><p><a href="https://zhuanlan.zhihu.com/p/394013628" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/394013628</a></p><h2 id="想实现一个对页面某个节点的拖曳-如何做-使用原生-js" tabindex="-1">想实现一个对页面某个节点的拖曳？如何做？（使用原生 JS） <a class="header-anchor" href="#想实现一个对页面某个节点的拖曳-如何做-使用原生-js" aria-label="Permalink to &quot;想实现一个对页面某个节点的拖曳？如何做？（使用原生 JS）&quot;">​</a></h2><p><code>draggable=&quot;true&quot;</code></p>',4)),c(a,{code:p(T)},{default:h(()=>[c(R)]),_:1},8,["code"]),e[1]||(e[1]=l("h2",{id:"文件拖拽",tabindex:"-1"},[y("文件拖拽 "),l("a",{class:"header-anchor",href:"#文件拖拽","aria-label":'Permalink to "文件拖拽"'},"​")],-1)),c(a,{code:p(Y)},{default:h(()=>[c(X)]),_:1},8,["code"])])}}});export{C as __pageData,O as default};
