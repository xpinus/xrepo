import{a2 as t,t as a,aq as l,q as r}from"./chunks/framework.jAttmLhR.js";const f=JSON.parse('{"title":"属性的可枚举性和所有权","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/js/js机制/属性的可枚举性和所有权.md","filePath":"knowledge-lib/js/js机制/属性的可枚举性和所有权.md"}'),i={name:"knowledge-lib/js/js机制/属性的可枚举性和所有权.md"};function o(s,e,n,p,_,d){return r(),a("div",null,e[0]||(e[0]=[l('<h1 id="属性的可枚举性和所有权" tabindex="-1">属性的可枚举性和所有权 <a class="header-anchor" href="#属性的可枚举性和所有权" aria-label="Permalink to &quot;属性的可枚举性和所有权&quot;">​</a></h1><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties" target="_blank" rel="noreferrer">MDN</a></p><p>JavaScript 对象中的每个属性能根据三个因素进行分类：</p><ul><li>字符串或 symbol；</li><li>可枚举或不可枚举； <ul><li>对于通过直接赋值或属性初始化器创建的属性，该标识值默认为 true</li><li>通过 Object.defineProperty 等定义的属性，默认并不是可枚举的</li><li>大多数迭代方法（如：for...in 循环和 Object.keys）仅访问可枚举的键</li></ul></li><li>自有属性或从原型链继承的属性。</li></ul><p>所有的属性，不论是可枚举或不可枚举、是字符串或 symbol、是自有的或继承的，都能用点记号表示法或方括号表示法</p>',5)]))}const m=t(i,[["render",o]]);export{f as __pageData,m as default};
