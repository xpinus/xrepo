import{t as l,y as o,a0 as a,K as s,u as t,ab as r,q as i}from"./chunks/framework.tQiMsDJj.js";const c=`// 实现
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
`,p=`function sleep(time) {\r
    let now = Date.now();\r
    while (Date.now() - now < time) {}\r
}\r
\r
console.log(1);\r
sleep(1000);\r
console.log(2);\r
`,f=JSON.parse('{"title":"实现sleep(1000)函数","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/算法/经典手写/sleep/index.md","filePath":"knowledge-lib/js/算法/经典手写/sleep/index.md"}'),d={name:"knowledge-lib/js/算法/经典手写/sleep/index.md"},w=Object.assign(d,{setup(m){return(u,e)=>{const n=r("run-script");return i(),l("div",null,[e[0]||(e[0]=o("h1",{id:"实现sleep-1000-函数",tabindex:"-1"},[a("实现sleep(1000)函数 "),o("a",{class:"header-anchor",href:"#实现sleep-1000-函数","aria-label":'Permalink to "实现sleep(1000)函数"'},"​")],-1)),s(n,{name:"基于promise",code:t(c)},null,8,["code"]),s(n,{name:"基于Date.now()",code:t(p)},null,8,["code"])])}}});export{f as __pageData,w as default};
