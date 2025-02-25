import{t,y as e,a0 as o,K as a,u as l,ab as s,q as d}from"./chunks/framework.tQiMsDJj.js";const i=`function add(arg1) {
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
`,m=JSON.parse('{"title":"函数式编程","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/算法/经典手写/函数式编程/index.md","filePath":"knowledge-lib/js/算法/经典手写/函数式编程/index.md"}'),u={name:"knowledge-lib/js/算法/经典手写/函数式编程/index.md"},g=Object.assign(u,{setup(c){return(p,n)=>{const r=s("run-script");return d(),t("div",null,[n[0]||(n[0]=e("h1",{id:"函数式编程",tabindex:"-1"},[o("函数式编程 "),e("a",{class:"header-anchor",href:"#函数式编程","aria-label":'Permalink to "函数式编程"'},"​")],-1)),n[1]||(n[1]=e("h2",{id:"面试题",tabindex:"-1"},[o("面试题 "),e("a",{class:"header-anchor",href:"#面试题","aria-label":'Permalink to "面试题"'},"​")],-1)),n[2]||(n[2]=e("blockquote",null,[e("p",null,"实现下面函数")],-1)),a(r,{code:l(i)},null,8,["code"])])}}});export{m as __pageData,g as default};
