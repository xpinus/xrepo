import{t,y as n,a0 as s,K as l,u as a,ab as u,q as i}from"./chunks/framework.tQiMsDJj.js";const o=`// 思路：贪心算法 + 二分查找 + 反向链表\r
\r
function getSequence(arr) {\r
    const p = arr.slice(); // 复制原数组，用于构建反向链表\r
    const result = [0]; // 结果，为最长子序列值的索引\r
    let i, j, u, v, c;\r
    const len = arr.length;\r
    for (i = 0; i < len; i++) {\r
        // 遍历原数组\r
        const arrI = arr[i]; // 当前值\r
        if (arrI !== 0) {\r
            j = result[result.length - 1]; // 获取最后一位保存的索引值\r
            if (arr[j] < arrI) {\r
                p[i] = j; // 记录反向链表，指向结果序列最后一位\r
                result.push(i); // 把i追加在结果序列末尾\r
                continue;\r
            }\r
            // 当前值比result末尾索引对应的值小时\r
            u = 0;\r
            v = result.length - 1;\r
            while (u < v) {\r
                //  二分查找\r
                c = (u + v) >> 1;\r
                if (arr[result[c]] < arrI) {\r
                    u = c + 1;\r
                } else {\r
                    v = c;\r
                }\r
            }\r
            if (arrI < arr[result[u]]) {\r
                // 找到result中第一位比当前值大的\r
                if (u > 0) {\r
                    p[i] = result[u - 1]; // 记录反向链表，指向结果序列前一位\r
                }\r
                result[u] = i; // 用当前索引值i，替换原来的值\r
            }\r
        }\r
    }\r
    u = result.length;\r
    v = result[u - 1];\r
    while (u-- > 0) {\r
        // 从后往前遍历，回溯修正结果序列\r
        result[u] = v;\r
        v = p[v];\r
    }\r
    return result;\r
}\r
\r
console.log(getSequence([10, 30, 200, 300, 40, 50, 60]));\r
console.log(getSequence([10, 0, 1, 2, 3, 1, 5]));\r
`,g=JSON.parse('{"title":"最长递增子序列","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/算法/经典手写/最长递增子序列/index.md","filePath":"knowledge-lib/js/算法/经典手写/最长递增子序列/index.md"}'),c={name:"knowledge-lib/js/算法/经典手写/最长递增子序列/index.md"},h=Object.assign(c,{setup(d){return(p,r)=>{const e=u("run-script");return i(),t("div",null,[r[0]||(r[0]=n("h1",{id:"最长递增子序列",tabindex:"-1"},[s("最长递增子序列 "),n("a",{class:"header-anchor",href:"#最长递增子序列","aria-label":'Permalink to "最长递增子序列"'},"​")],-1)),l(e,{code:a(o)},null,8,["code"])])}}});export{g as __pageData,h as default};
