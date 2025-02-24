import{a2 as i,t as a,aq as t,q as h}from"./chunks/framework.jAttmLhR.js";const E=JSON.parse('{"title":"video","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/html&css/HTML/video/index.md","filePath":"knowledge-lib/html&css/HTML/video/index.md"}'),e={name:"knowledge-lib/html&css/HTML/video/index.md"};function l(n,s,p,k,d,o){return h(),a("div",null,s[0]||(s[0]=[t(`<h1 id="video" tabindex="-1">video <a class="header-anchor" href="#video" aria-label="Permalink to &quot;video&quot;">​</a></h1><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">video</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./test.mp4&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> controls</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;controls&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;700px&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;400px&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  浏览器不支持video</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">video</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><p>有些比较老的浏览器可能不支持 <code>&lt;video&gt;</code> 标签，放置文本内容，这样当某个浏览器不支持此标签时，就可以显示提示内容</p><p><code>src</code> 将要播放的视频的 URL</p><p><code>controls</code> 如果设置该属性，则向用户显示控件，例如播放按钮，音量按钮等</p><p><code>autoplay</code> 如果设置该属性，则视频在就绪后马上播放，设置了 autoplay 后会忽略属性 preload</p><p><code>width</code> 设置视频播放器的宽度</p><p><code>height</code> 设置视频播放器的高度</p><p><code>loop</code> 如果设置该属性，则当媒介文件完成播放后再次开始播放</p><p><code>muted</code> 设置视频的音频输出应该被静音</p><p><code>poster</code> 规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像</p><p><code>preload</code> 如果设置该属性，则视频在页面加载时进行加载，并预备播放</p><p><strong>视频格式</strong></p><table tabindex="0"><thead><tr><th>视频格式</th><th>描述</th></tr></thead><tbody><tr><td>Ogg</td><td>带有 Theora 视频编码和 Vorbis 音频编码的 Ogg 文件</td></tr><tr><td>MPEG</td><td>4（MP4） 带有 H.264 视频编码和 AAC 音频编码的 MPEG 4 文件</td></tr><tr><td>WebM</td><td>带有 VP8 视频编码和 Vorbis 音频编码的 WebM 文件</td></tr></tbody></table><p>这三种视频格式，在不同的浏览器中兼容性不同，例如 MP4 格式不支持 Firefox 和 Opera 浏览器，Ogg 格式不支持IE、Safari 浏览器，WebM 格式不支持IE、Safari 浏览器等。所以我们可能需要在不同的浏览器中使用不同的视频格式，这需要用到 <source> 标签。</p><div class="language-html vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">video</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> controls</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;controls&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;700px&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;400px&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">source</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./test.mp4&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;video/mp4&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  &lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">source</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./test.ogg&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> type</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;video/ogg&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  您的浏览器不支持 video 标签</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">video</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre></div><h2 id="实现一个自定义controls" tabindex="-1">实现一个自定义controls <a class="header-anchor" href="#实现一个自定义controls" aria-label="Permalink to &quot;实现一个自定义controls&quot;">​</a></h2><h2 id="hls-js-视频流" tabindex="-1">hls.js ? 视频流 <a class="header-anchor" href="#hls-js-视频流" aria-label="Permalink to &quot;hls.js ?  视频流&quot;">​</a></h2>`,18)]))}const g=i(e,[["render",l]]);export{E as __pageData,g as default};
