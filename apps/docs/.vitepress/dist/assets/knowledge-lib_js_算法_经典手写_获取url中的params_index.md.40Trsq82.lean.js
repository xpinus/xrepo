import{t as l,y as n,a0 as r,K as t,u as a,ab as o,q as c}from"./chunks/framework.tQiMsDJj.js";const i=`function getParams(url) {
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
`,u=`const paramsStr = 'q=%E5%B2%9B%E5%B1%BF%E9%97%AE%E9%A2%98&PC=U316&FORM=CHROMN';
const urlSearchParams = new URLSearchParams(paramsStr);
const res = Object.fromEntries(urlSearchParams.entries());
console.log(res);
`,E=JSON.parse('{"title":"解析URL中的参数","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/算法/经典手写/获取url中的params/index.md","filePath":"knowledge-lib/js/算法/经典手写/获取url中的params/index.md"}'),m={name:"knowledge-lib/js/算法/经典手写/获取url中的params/index.md"},B=Object.assign(m,{setup(d){return(p,e)=>{const s=o("run-script");return c(),l("div",null,[e[2]||(e[2]=n("h1",{id:"解析url中的参数",tabindex:"-1"},[r("解析URL中的参数 "),n("a",{class:"header-anchor",href:"#解析url中的参数","aria-label":'Permalink to "解析URL中的参数"'},"​")],-1)),n("ul",null,[n("li",null,[e[0]||(e[0]=r("法1 浏览器API")),t(s,{code:a(u)},null,8,["code"])]),n("li",null,[e[1]||(e[1]=r("法2")),t(s,{code:a(i)},null,8,["code"])])])])}}});export{E as __pageData,B as default};
