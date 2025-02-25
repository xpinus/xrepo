import{t as l,y as r,a0 as e,K as a,u as o,ab as i,q as s}from"./chunks/framework.tQiMsDJj.js";const u=`function myFlat(arr) {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? myFlat(cur) : [cur]);
    }, []);
}

// 用例
const arr = [1, [2, 3, [4, [5]]]];
console.log(arr.flat(Infinity)); // Array方法
console.log(myFlat(arr));
`,c=`const arr = [1, {\r
    a: 2,\r
    b: 3,\r
}, {\r
    a: 2,\r
    b: 3,\r
}, 1, {c: undefined}, {d: undefined}]\r
\r
function unique(arr) {\r
    const result = [];\r
\r
    outer: for(const item of arr) {\r
        for(const r of result) {\r
            if(isEqual(item, r)) {\r
                continue outer;\r
            }\r
        }\r
\r
        result.push(item);\r
    }\r
\r
    return result;\r
}\r
\r
function isEqual(a, b) {\r
    if(isPrimitive(a) || isPrimitive(b)) {\r
        return Object.is(a, b);\r
    }\r
\r
    const entriesA = Object.entries(a);\r
    const entriesB = Object.entries(b);\r
\r
    if(entriesA.length !== entriesB.length) {\r
        return false;\r
    }\r
\r
    for(const [key, value] of entriesA) {\r
        if(!isEqual(value, b[key]) || !b.hasOwnProperty(key)) {\r
            return false;\r
        }\r
    }\r
\r
    return true\r
}\r
\r
// 判断是否为原始类型\r
function isPrimitive(value) {\r
    return value !== Object(value)\r
}\r
\r
console.log(unique(arr));`,d=`const arr = [1, 2, 3, 4, 5];\r
\r
function shuffle(arr) {\r
    for (let i = 0; i < arr.length; i++) {\r
        const target = Math.floor(Math.random() * i);\r
\r
        [arr[i], arr[target]] = [arr[target], arr[i]];\r
    }\r
\r
    return arr;\r
}\r
\r
shuffle(arr);\r
console.log(arr);\r
`,h=JSON.parse('{"title":"数组相关手写","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/算法/经典手写/数组相关/index.md","filePath":"knowledge-lib/js/算法/经典手写/数组相关/index.md"}'),f={name:"knowledge-lib/js/算法/经典手写/数组相关/index.md"},g=Object.assign(f,{setup(b){return(m,n)=>{const t=i("run-script");return s(),l("div",null,[n[0]||(n[0]=r("h1",{id:"数组相关手写",tabindex:"-1"},[e("数组相关手写 "),r("a",{class:"header-anchor",href:"#数组相关手写","aria-label":'Permalink to "数组相关手写"'},"​")],-1)),n[1]||(n[1]=r("h2",{id:"数组扁平化",tabindex:"-1"},[e("数组扁平化 "),r("a",{class:"header-anchor",href:"#数组扁平化","aria-label":'Permalink to "数组扁平化"'},"​")],-1)),a(t,{code:o(u)},null,8,["code"]),n[2]||(n[2]=r("h2",{id:"数组去重",tabindex:"-1"},[e("数组去重 "),r("a",{class:"header-anchor",href:"#数组去重","aria-label":'Permalink to "数组去重"'},"​")],-1)),n[3]||(n[3]=r("blockquote",null,[r("p",null,"两个属性相同的对象也认为是相同的")],-1)),a(t,{code:o(c)},null,8,["code"]),n[4]||(n[4]=r("h2",{id:"数组打乱顺序",tabindex:"-1"},[e("数组打乱顺序 "),r("a",{class:"header-anchor",href:"#数组打乱顺序","aria-label":'Permalink to "数组打乱顺序"'},"​")],-1)),a(t,{code:o(d)},null,8,["code"]),n[5]||(n[5]=r("blockquote",null,[r("p",null,[e("为什么不用sort, 如"),r("code",null,"arr.sort((a, b) => Math.random() - 0.5)")]),r("p",null,"sort算法会导致程序不稳定，极端条件下可能不会打乱顺序")],-1))])}}});export{h as __pageData,g as default};
