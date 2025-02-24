import{a2 as i,t as a,aq as l,q as t}from"./chunks/framework.jAttmLhR.js";const o=JSON.parse('{"title":"Ajax和网络请求","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/browser/ajax.md","filePath":"knowledge-lib/browser/ajax.md"}'),n={name:"knowledge-lib/browser/ajax.md"};function e(h,s,p,k,r,d){return t(),a("div",null,s[0]||(s[0]=[l(`<h1 id="ajax和网络请求" tabindex="-1">Ajax和网络请求 <a class="header-anchor" href="#ajax和网络请求" aria-label="Permalink to &quot;Ajax和网络请求&quot;">​</a></h1><ul><li><code>Ajax</code>的原理简单来说是在用户和服务器之间加了—个中间层(<code>AJAX</code>引擎)，通过向服务器发异步请求，从服务器获得数据，然后用<code>javascript</code>来操作<code>DOM</code>而更新页面。使用户操作与服务器响应异步化。这其中最关键的一步就是从服务器获得请求数据</li><li><code>XHR</code>和<code>Fecth</code>是具体的可行方案</li></ul><p><strong>有那些优缺点?</strong></p><ul><li>优点： <ul><li>通过异步模式，提升了用户体验.</li><li>优化了浏览器和服务器之间的传输，减少不必要的数据往返，减少了带宽占用.</li><li><code>Ajax</code>在客户端运行，承担了一部分本来由服务器承担的工作，减少了大用户量下的服务器负载。</li><li><code>Ajax</code>可以实现动态不刷新（局部刷新）</li></ul></li><li>缺点： <ul><li>安全问题 <code>AJAX</code>暴露了与服务器交互的细节。</li><li>对搜索引擎的支持比较弱。</li><li>不容易调试。</li></ul></li></ul><h2 id="xhr" tabindex="-1">XHR <a class="header-anchor" href="#xhr" aria-label="Permalink to &quot;XHR&quot;">​</a></h2><div class="language-javascript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/** 1. 创建连接 **/</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">var</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> xhr </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">xhr </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> new</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> XMLHttpRequest</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">();</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/** 2. 连接服务器 **/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">xhr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">open</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;get&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, url, </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/** 3. 发送请求 **/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">xhr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">send</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">null</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/** 4. 接受请求 **/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">xhr.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">onreadystatechange</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> () {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">	if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (xhr.readyState </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 4</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">		if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (xhr.status </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 200</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">) {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">			success</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(xhr.responseText);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		} </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">			/** false **/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">			fail </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&amp;&amp;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> fail</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(xhr.status);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">		}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	}</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">};</span></span></code></pre></div><h2 id="fetch" tabindex="-1">Fetch <a class="header-anchor" href="#fetch" aria-label="Permalink to &quot;Fetch&quot;">​</a></h2><p>符合关注分离，没有将输入、输出和用事件来跟踪的状态混杂在一个对象里 更好更方便的写法 更加底层，提供的API丰富（request, response） 脱离了XHR，是ES规范里新的实现方式 1）fetchtch只对网络请求报错，对400，500都当做成功的请求，需要封装去处理 2）fetch默认不会带cookie，需要添加配置项 3）fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了量的浪费 4）fetch没有办法原生监测请求的进度，而XHR可以</p><h3 id="请求参数" tabindex="-1">请求参数 <a class="header-anchor" href="#请求参数" aria-label="Permalink to &quot;请求参数&quot;">​</a></h3><ul><li>url</li><li>options <ul><li>method</li><li>body</li><li>headers</li><li>...</li></ul></li></ul><h2 id="ajax发送2次请求的原因" tabindex="-1"><a href="https://blog.csdn.net/u012149969/article/details/108172195" target="_blank" rel="noreferrer">ajax发送2次请求的原因</a> <a class="header-anchor" href="#ajax发送2次请求的原因" aria-label="Permalink to &quot;[ajax发送2次请求的原因](https://blog.csdn.net/u012149969/article/details/108172195)&quot;">​</a></h2><p>之所以会发送2次请求，那是因为我们使用了**带预检(Preflighted)**的跨域请求。该请求会在发送真实的请求之前发送一个类型为OPTIONS的预检请求。预检请求会检测服务器是否支持我们的真实请求所需要的跨域资源，唯有资源满足条件才会发送真实的请求。比如我们在请求头部增加了authorization项，那么在服务器响应头中需要放入Access-Control-Allow-Headers，并且其值中必须要包含authorization，否则OPTIONS预检会失败，从而导致不会发送真实的请求。</p>`,12)]))}const c=i(n,[["render",e]]);export{o as __pageData,c as default};
