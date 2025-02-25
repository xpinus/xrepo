import{t as a,ao as r,K as l,u as o,y as e,a0 as c,ab as s,q as i}from"./chunks/framework.tQiMsDJj.js";const u=`function isPrimitive(target) {
    return target !== Object(target); // Object()参数如果是引用数据会原样返回
}

function deepClone(target, cache = new WeakMap()) {
    if (isPrimitive(target)) return target;

    if (cache.has(target)) return cache.get(target);
    const newObj = new target.constructor();
    cache.set(target, newObj);

    if (newObj instanceof Function) return newObj; // Function下去遍历会有而外的属性，这里直接返回

    for (const key of Reflect.ownKeys(target)) {
        newObj[key] = deepClone(target[key], cache);
    }

    return newObj;
}

// 测试：
const test = {
    name: 'xyf',
    age: 16,
    children: {
        name: 'ch1',
        age: 0,
    },
    f: [1, 2, 3],
    others: undefined,
    action: function () {
        console.log(this.name);
    },
    // s: new Set([1, 2, 3]),   // Set Map还是要额外处理
};
test.children.circle = test; // 循环引用

const cloneObj = deepClone(test);

console.log(cloneObj.children === test.children); // false
test.action();
// console.log(cloneObj === cloneObj.children.circle);
`,d=`const student1 = {
    name: '张三',
    hello() {
        console.log('hello');
    },
    score: [{ key: '数学', value: '99' }],
};

try {
    console.log(structuredClone(student1)); // 报错：不能克隆函数
} catch (err) {
    console.warn(err);
}

const student2 = {
    name: '李四',
    score: [{ key: '数学', value: '59' }],
};

console.log(structuredClone(student2));
`,m=JSON.parse('{"title":"深浅拷贝","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/算法/经典手写/深浅拷贝/index.md","filePath":"knowledge-lib/js/算法/经典手写/深浅拷贝/index.md"}'),h={name:"knowledge-lib/js/算法/经典手写/深浅拷贝/index.md"},p=Object.assign(h,{setup(g){return(f,n)=>{const t=s("run-script");return i(),a("div",null,[n[0]||(n[0]=r('<h1 id="深浅拷贝" tabindex="-1">深浅拷贝 <a class="header-anchor" href="#深浅拷贝" aria-label="Permalink to &quot;深浅拷贝&quot;">​</a></h1><h2 id="浅拷贝" tabindex="-1">浅拷贝 <a class="header-anchor" href="#浅拷贝" aria-label="Permalink to &quot;浅拷贝&quot;">​</a></h2><ul><li>展开运算符<code>...</code></li><li><code>Object.assign</code></li></ul><h2 id="深拷贝" tabindex="-1">深拷贝 <a class="header-anchor" href="#深拷贝" aria-label="Permalink to &quot;深拷贝&quot;">​</a></h2><ul><li>可以通过 <code>JSON.parse(JSON.stringify(object))</code> 来解决 <ul><li>会忽略 <code>undefined</code>和函数</li><li>不能解决循环引用的对象</li><li>将Date对象转换为字符串</li></ul></li><li>第三方库lodash, 递归拷贝</li></ul>',5)),l(t,{code:o(u)},null,8,["code"]),n[1]||(n[1]=e("ul",null,[e("li",null,[c("structuredClone() API 结构化克隆算法 "),e("ul",null,[e("li",null,"core-js 已经支持 structuredClone 的 polyfill"),e("li",null,"是浏览器提供的原生API，内部实现已经处理了许多复杂的细节和边缘情况，如循环引用、嵌套对象等，性能更好"),e("li",null,"可以用于跨线程或跨工作线程的数据传输"),e("li",null,"不支持拷贝某些复杂类型，如 Function、Dom节点、及对象上的一些特殊参数getter/setter/原型链等")])])],-1)),l(t,{code:o(d)},null,8,["code"])])}}});export{m as __pageData,p as default};
