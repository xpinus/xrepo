import{a as f}from"./chunks/theme.BBBzFzPf.js";import{a3 as g,q as i,t as a,K as o,I as p,a0 as u,y as n,F as x,u as _,ac as y}from"./chunks/framework.Dt9YBBJv.js";const b={__name:"flip",setup(c){function s(t){requestAnimationFrame(()=>requestAnimationFrame(t()))}function e(){const t=document.getElementById("el"),r=()=>{const{top:m}=t.getBoundingClientRect();return m},l=r();document.getElementById("list").insertBefore(t,null);const d=r()-l;t.style.transform=`translateY(-${d}px)`,s(()=>{t.style.transition="transform .5s ease-in-out",t.style.removeProperty("transform")})}return(t,r)=>{const l=f;return i(),a(x,null,[o(l,{onClick:e},{default:p(()=>r[0]||(r[0]=[u("改变第一个元素位置")])),_:1}),r[1]||(r[1]=n("ul",{id:"list"},[n("li",{id:"el"},"1"),n("li",null,"2"),n("li",null,"3"),n("li",null,"4"),n("li",null,"5")],-1))],64)}}},F=g(b,[["__scopeId","data-v-3c51e58a"]]),I=`<script setup>\r
\r
function raf(callback) {\r
  requestAnimationFrame(\r
      () => requestAnimationFrame(callback())\r
  )\r
}\r
\r
function play() {\r
  const el = document.getElementById('el');\r
\r
  const getTop = () => {\r
    const { top } = el.getBoundingClientRect();\r
    return top\r
  }\r
\r
  // F: 记录初始位置\r
  const fromTop = getTop();\r
\r
  // T: 记录目标位置\r
  const list = document.getElementById('list');\r
  list.insertBefore(el, null); // 插入到list末尾\r
  const toTop = getTop();\r
\r
  // I: 视觉上返回初始位置\r
  const distance = toTop - fromTop;\r
  el.style.transform = \`translateY(-\${distance}px)\`;\r
\r
  // P: 播放移动到目标位置的动画\r
  raf(() => {\r
    el.style.transition = 'transform .5s ease-in-out';\r
    el.style.removeProperty('transform');\r
  })\r
\r
}\r
<\/script>\r
\r
<template>\r
  <x-button @click="play">改变第一个元素位置</x-button>\r
\r
  <ul id="list">\r
    <li id="el">1</li>\r
    <li>2</li>\r
    <li>3</li>\r
    <li>4</li>\r
    <li>5</li>\r
  </ul>\r
</template>\r
\r
<style scoped lang="less">\r
ul {\r
  margin: 20px 0;\r
}\r
\r
li {\r
  box-sizing: border-box;\r
  border-radius: 32px;\r
  height: 32px;\r
  width: 240px;\r
  padding: 0 12px;\r
  list-style: none;\r
  background: #a5eaa3;\r
  line-height: 32px;\r
}\r
\r
#el {\r
  background: #f1f1f1;\r
}\r
</style>\r
`,w=JSON.parse('{"title":"FLIP","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/场景应用/FLIP/index.md","filePath":"knowledge-lib/js/场景应用/FLIP/index.md"}'),k={name:"knowledge-lib/js/场景应用/FLIP/index.md"},L=Object.assign(k,{setup(c){return(s,e)=>{const t=y("preview");return i(),a("div",null,[e[0]||(e[0]=n("h1",{id:"flip",tabindex:"-1"},[u("FLIP "),n("a",{class:"header-anchor",href:"#flip","aria-label":'Permalink to "FLIP"'},"​")],-1)),e[1]||(e[1]=n("blockquote",null,[n("p",null,"一种实现动画的思想")],-1)),e[2]||(e[2]=n("ul",null,[n("li",null,"First: 记录元素的初始位置"),n("li",null,"Last: 记录元素的最终位置"),n("li",null,"Inver: 记录元素的反向位置"),n("li",null,"Play: 记录元素的当前位置")],-1)),o(t,{code:_(I)},{default:p(()=>[o(F)]),_:1},8,["code"])])}}});export{w as __pageData,L as default};
