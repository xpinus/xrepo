import{_ as s}from"./chunks/structure.BTUmsxcv.js";import{a2 as a,t as e,ao as p,q as l}from"./chunks/framework.tQiMsDJj.js";const t="/assets/top.CcuCdyTv.png",u=JSON.parse('{"title":"建站","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/engineering/CICD/建站.md","filePath":"knowledge-lib/engineering/CICD/建站.md"}'),i={name:"knowledge-lib/engineering/CICD/建站.md"};function o(r,n,c,d,m,_){return l(),e("div",null,n[0]||(n[0]=[p('<h1 id="建站" tabindex="-1">建站 <a class="header-anchor" href="#建站" aria-label="Permalink to &quot;建站&quot;">​</a></h1><blockquote><p>云服务商如腾讯云的指引都很清晰，跟着走就没大问题</p></blockquote><ol><li>购买服务器</li></ol><p>在服务器上部署项目，先使用ip直接访问没问题</p><p><img src="'+s+`" alt=""></p><div class="language-txt vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">txt</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>services:</span></span>
<span class="line"><span>    backend:</span></span>
<span class="line"><span>        container_name: backend_server</span></span>
<span class="line"><span>        build: ./backend</span></span>
<span class="line"><span>        image: backend:$BACKEND_COMMIT</span></span>
<span class="line"><span>        ports:</span></span>
<span class="line"><span>            - 7001:7001</span></span>
<span class="line"><span>        restart: always</span></span>
<span class="line"><span>    frontend:</span></span>
<span class="line"><span>        container_name: frontend_server</span></span>
<span class="line"><span>        build: ./frontend</span></span>
<span class="line"><span>        image: frontend:$FRONTEND_COMMIT</span></span>
<span class="line"><span>        ports:</span></span>
<span class="line"><span>            - 80:80</span></span>
<span class="line"><span>        restart: always</span></span>
<span class="line"><span>        depends_on:</span></span>
<span class="line"><span>            - backend</span></span></code></pre></div><ol start="2"><li>购买域名</li></ol><p>在云服务商处购买域名</p><p><img src="`+t+'" alt="域名购买之后"></p><ol start="3"><li>备案</li><li>DNS域名解析：将域名指向我们的服务器</li></ol>',10)]))}const k=a(i,[["render",o]]);export{u as __pageData,k as default};
