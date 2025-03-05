import{a3 as d,t as i,ao as s,q as l}from"./chunks/framework.Dt9YBBJv.js";const g=JSON.parse('{"title":"面试中的心态建设","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/blogs/cv.md","filePath":"knowledge-lib/blogs/cv.md"}'),p={name:"knowledge-lib/blogs/cv.md"};function a(e,t,r,n,h,o){return l(),i("div",null,t[0]||(t[0]=[s('<p>错误字 专业技能混乱而零散 角色不要把自己定位成基层开发人员 项目经验过于大众化，什么负责开发、维护、性能优化，没啥价值</p><p>个人优势：</p><ol><li>基础方面：掌握HTML\\CSS\\JS，掌握js的内部机制，包括事件循环、内存管理、原型链等，掌握typescript项目开发和类型处理，了解浏览器的组成和渲染原理;</li><li>框架方面：掌握vue3框架底层编译渲染原理和响应式系统运行机制，了解其源码的实现方式；熟练掌握Vue2\\React等现代前端框架，拥有各个框架开发多个大型项目的业务经验，对框架的周边生态（Vue Router、Pinia、ElementPlus、React-router、redux等）有一定的心得和体会；</li><li>工程化方面：熟练掌握Vite、Webpack、Rollup、gulp等前端工程化工具，了解不同工具的核心原理以及差异，针对每种工具能实现自定义构建流程和打包优化。掌握前端常见性能优化手段，包括代码分割、懒加载、资源优化等技术，显著降低FCP和LCP时间，提升用户交互体验；</li><li>架构方面：熟悉web项目开发流程和开发规范，包括但不限于前端工具链的选型、自定义构建工具的构建流程和打包优化，团队代码规范的制定以及相关工具的选型和配置。可以根据需求从0到1搭建整个monorepo项目、打包优化上线，对前端架构、CI/CD等有自己的理解和实践；</li><li>后端能力：熟练掌握Nest.js后端框架，能够设计并实现Restful风格的API，做到前后端分离。熟悉MySQL、 Redis、Chroma等的基本使用，能够设计简单的数据库模型，进行数据的CRUD操作； AI开发：熟悉基于langchain.js的RAG检索增强框架开发，可以自主搭建Agent流程，实现基于大模型的AI任务 规划与执行。</li></ol><p>工作经历</p><p>2023.6 - 至今 超星云舟有限公司（超星集团南京研究院） web开发工程师 + 前端项目负责人</p><p>2021.10-2022.07 杭州网易 web开发工程师（实习）</p><p>项目</p><p><strong>AI阅读项目</strong></p><p>项目背景：<strong>情景、任务</strong> 技术栈：vue3 + vue-router + pinia + pdfjs + epubjs + d3 + echarts 工作内容和两点：</p><ul><li>需求沟通，技术方案选型和落地</li><li>封装pdf\\epub文件阅读组件，以复用在其它项目中</li><li>使用echart\\d3...\\实现多种图表、词云动态效果</li></ul><p><strong>使用 xx 技术，实现了 xx 功能，达到 xx 效果</strong></p><p>亮点：</p><ol><li>基于虚拟列表封装了pdf、epub阅读器组件，实现高性能加载浏览，也在被其它项目中被采用</li><li>针对已有的懒加载的图片阅读器，使用限制最大并发请求队列优化用户快速滚动场景下导致的大量图片并发加载问题，提高用户的交互体验</li><li>移动端、平板、hybrid应用兼容适配，做路由keep-alive和组件的动态加载拆分, 优化首页加载性能（注意effect的钩子）</li><li>实现svg脑图下载，时反馈组件问题，改善开源库，为实现自定义功能，搭建了本地npm仓库，在多个项目中被使用</li></ol><blockquote><p>js-bridge</p></blockquote><blockquote><p>某项目中的实践与问题</p></blockquote><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">const</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> searchResultComponent</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> computed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  searchType.value; </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">// ! 这是必不可少的，用于触发依赖收集</span></span>\n<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">  return</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> defineAsyncComponent</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(() </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=&gt;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> import</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">`./${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">searchType</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">value</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}SearchResult.vue`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">));</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">});</span></span></code></pre></div><p><strong>老项目开发流程优化搭建组件库</strong></p><p>项目背景：老项目</p><p>工作内容：</p><p>亮点： 推动老项目采用前后端分离开发，建立menorepo的前端项目库，目前已实践于两个新子页面</p><ol><li></li><li>封装逻辑hook, echart组件、跨页面通信组件等,</li><li>封装请求库</li></ol><p><strong>团队工作辅助的AI服务</strong></p><p>项目背景：</p><p>工作内容及亮点：</p><ol><li><p>基于工厂模式的爬虫，实现互联网相关视频搜索功能，支持灵活扩展</p></li><li><p>基于大模型的网页智能数据提取功能，从不同结构的html中分析出需要的json数据</p></li></ol><p>个人</p><p>热爱前端技术，有个人用来总结前端知识的个人网站（xrepo.top）,有进行开源库开发的兴趣。</p><p>对前端和ai结合实现有探索兴趣，目前有在尝试做基于ai的新闻自媒体。</p><h1 id="面试中的心态建设" tabindex="-1">面试中的心态建设 <a class="header-anchor" href="#面试中的心态建设" aria-label="Permalink to &quot;面试中的心态建设&quot;">​</a></h1><p><strong>不要表现的像要饭的</strong></p><ol><li><p>对知识盲区的合理看待</p></li><li><p>对技术的热情</p></li><li><p>对这份工作的向往</p></li></ol><p>谈薪：</p><p>我的预期是18k, 20k</p><ol><li>我不是狮子大开口，是结合这个公司的岗位</li><li>还有的谈吗，可以再争取吗</li><li>自己也正在大量面试阶段，也有其它offer, 最想去贵公司</li><li>自己结婚买房压力大，因此可能对薪资要求多点</li><li>争取考虑时间</li></ol><table tabindex="0"><thead><tr><th>name</th><th>desc</th><th>push</th><th>readed</th><th>process</th></tr></thead><tbody><tr><td>字节</td><td></td><td></td><td></td><td></td></tr><tr><td>小米</td><td></td><td></td><td></td><td></td></tr><tr><td>嘉环科技（外包）</td><td></td><td></td><td></td><td></td></tr><tr><td>圆心科技</td><td></td><td></td><td></td><td></td></tr><tr><td>CIC灼识</td><td></td><td></td><td></td><td></td></tr><tr><td>Symbio</td><td></td><td></td><td></td><td></td></tr><tr><td>中盈优创</td><td></td><td></td><td></td><td></td></tr><tr><td>恒宝</td><td></td><td></td><td></td><td></td></tr><tr><td>汇瑾科技</td><td></td><td></td><td></td><td></td></tr><tr><td>Dimension5</td><td></td><td></td><td></td><td></td></tr><tr><td>联蔚数科</td><td></td><td></td><td></td><td></td></tr><tr><td>国睿安泰信</td><td></td><td></td><td></td><td></td></tr><tr><td>强思数科</td><td></td><td></td><td></td><td></td></tr><tr><td>博晟宇</td><td></td><td></td><td></td><td></td></tr><tr><td>中科润物</td><td></td><td></td><td></td><td></td></tr><tr><td>南京天溯</td><td></td><td></td><td></td><td></td></tr><tr><td>中电智恒信息科技服务</td><td></td><td></td><td></td><td></td></tr><tr><td>擎天科技</td><td></td><td></td><td></td><td></td></tr><tr><td>菲克思能源科技</td><td></td><td></td><td></td><td></td></tr></tbody></table>',35)]))}const c=d(p,[["render",a]]);export{g as __pageData,c as default};
