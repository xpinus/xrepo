import{t,y as e,a0 as a,K as o,u as s,ab as d,q as l}from"./chunks/framework.tQiMsDJj.js";const c=`// add
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
`,m=JSON.parse('{"title":"柯里化","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/算法/经典手写/柯里化/index.md","filePath":"knowledge-lib/js/算法/经典手写/柯里化/index.md"}'),i={name:"knowledge-lib/js/算法/经典手写/柯里化/index.md"},_=Object.assign(i,{setup(u){return(g,n)=>{const r=d("run-script");return l(),t("div",null,[n[0]||(n[0]=e("h1",{id:"柯里化",tabindex:"-1"},[a("柯里化 "),e("a",{class:"header-anchor",href:"#柯里化","aria-label":'Permalink to "柯里化"'},"​")],-1)),o(r,{code:s(c)},null,8,["code"])])}}});export{m as __pageData,_ as default};
