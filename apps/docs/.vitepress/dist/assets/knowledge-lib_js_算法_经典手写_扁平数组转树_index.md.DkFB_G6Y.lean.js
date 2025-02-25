import{t as a,y as e,a0 as t,K as r,u as d,ab as o,q as s}from"./chunks/framework.tQiMsDJj.js";const l=`function toTree(arr, pid) {
    return arr
        .filter((item) => item.pid === pid)
        .map((item) => {
            return { ...item, children: toTree(arr, item.id) };
        });
}

// 示例
const arr = [
    { id: 1, pid: 0 },
    { id: 2, pid: 0 },
    { id: 3, pid: 1 },
    { id: 4, pid: 2 },
    { id: 5, pid: 3 },
];
console.log(toTree(arr, 0));
`,p=`function toTree(arr) {
    const map = {};

    for (const item of arr) {
        // 创建自己和父级的关系
        if (map.hasOwnProperty(item.pid)) {
            map[item.pid].push(item);
        } else {
            map[item.pid] = [item];
        }

        // 创建自己和子级的关系
        if (map.hasOwnProperty(item.id)) {
            item.children = map[item.id];
        } else {
            item.children = [];
            map[item.id] = item.children;
        }
    }

    return map[0]; // 顶级pid下就是树的入口
}

const arr = [
    { id: 1, pid: 0 },
    { id: 2, pid: 0 },
    { id: 3, pid: 1 },
    { id: 4, pid: 2 },
    { id: 5, pid: 3 },
];
console.log(JSON.stringify(toTree(arr)));
`,h=JSON.parse('{"title":"扁平数组转树","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/算法/经典手写/扁平数组转树/index.md","filePath":"knowledge-lib/js/算法/经典手写/扁平数组转树/index.md"}'),m={name:"knowledge-lib/js/算法/经典手写/扁平数组转树/index.md"},_=Object.assign(m,{setup(c){return(u,n)=>{const i=o("run-script");return s(),a("div",null,[n[0]||(n[0]=e("h1",{id:"扁平数组转树",tabindex:"-1"},[t("扁平数组转树 "),e("a",{class:"header-anchor",href:"#扁平数组转树","aria-label":'Permalink to "扁平数组转树"'},"​")],-1)),n[1]||(n[1]=e("ul",null,[e("li",null,"法1 简单易懂，性能能差")],-1)),r(i,{code:d(l)},null,8,["code"]),n[2]||(n[2]=t(" - 法2 ")),r(i,{code:d(p)},null,8,["code"])])}}});export{h as __pageData,_ as default};
