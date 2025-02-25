import{a2 as i,q as a,t as o,y as n,a0 as d,K as t,I as p,u as c,ab as x}from"./chunks/framework.tQiMsDJj.js";const b="/assets/img.BmoqofIK.png",m={},f={class:"expand-block"};function h(s,r){return a(),o("div",f,r[0]||(r[0]=[n("input",{type:"checkbox",id:"exp",style:{display:"none"}},null,-1),n("div",{class:"expand-text"},[n("label",{class:"expand-btn",for:"exp"},"展开"),n("span",null,"VitePress 是一个静态站点生成器 (SSG)，专为构建快速、以内容为中心的站点而设计。简而言之，VitePress 获取用 Markdown 编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。")],-1)]))}const k=i(m,[["render",h]]),u=`<template>\r
    <div class="expand-block">\r
        <input\r
            type="checkbox"\r
            id="exp"\r
            style="display: none"\r
        />\r
        <div class="expand-text">\r
            <label\r
                class="expand-btn"\r
                for="exp"\r
                >展开</label\r
            >\r
            <span\r
                >VitePress 是一个静态站点生成器 (SSG)，专为构建快速、以内容为中心的站点而设计。简而言之，VitePress 获取用 Markdown\r
                编写的内容，对其应用主题，并生成可以轻松部署到任何地方的静态 HTML 页面。</span\r
            >\r
        </div>\r
    </div>\r
</template>\r
\r
<style>\r
* {\r
    box-sizing: border-box;\r
    margin: 0;\r
    padding: 0;\r
}\r
\r
.expand-block {\r
    display: flex;\r
}\r
\r
.expand-text {\r
    display: -webkit-box;\r
    -webkit-line-clamp: 2;\r
    -webkit-box-orient: vertical;\r
    overflow: hidden;\r
}\r
\r
.expand-text::before {\r
    content: '';\r
    float: right;\r
    height: 100%;\r
    margin-bottom: -24px; /* line-height */\r
}\r
\r
.expand-btn {\r
    color: transparent;\r
    float: right;\r
    position: relative;\r
    clear: both;\r
}\r
\r
.expand-btn::before {\r
    content: '展开';\r
    color: #409eff;\r
    cursor: pointer;\r
    position: absolute;\r
}\r
\r
.expand-block input:checked + .expand-text {\r
    -webkit-line-clamp: 999; /* 一个随意较大的值 */\r
}\r
\r
.expand-block input:checked + .expand-text .expand-btn::before {\r
    content: '收起';\r
}\r
</style>\r
`,w=JSON.parse('{"title":"多行文本展开收起","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/html&css/CSS/多行文本展开收起/index.md","filePath":"knowledge-lib/html&css/CSS/多行文本展开收起/index.md"}'),_={name:"knowledge-lib/html&css/CSS/多行文本展开收起/index.md"},v=Object.assign(_,{setup(s){return(r,e)=>{const l=x("preview");return a(),o("div",null,[e[0]||(e[0]=n("h1",{id:"多行文本展开收起",tabindex:"-1"},[d("多行文本展开收起 "),n("a",{class:"header-anchor",href:"#多行文本展开收起","aria-label":'Permalink to "多行文本展开收起"'},"​")],-1)),e[1]||(e[1]=n("p",null,[n("a",{href:"https://www.cnblogs.com/niejunchan/p/15078198.html",target:"_blank",rel:"noreferrer"},"CSS 实现多行文本展开收起效果")],-1)),e[2]||(e[2]=n("p",null,[n("img",{src:b,alt:"参考"})],-1)),t(l,{code:c(u)},{default:p(()=>[t(k)]),_:1},8,["code"])])}}});export{w as __pageData,v as default};
