import{a2 as l,t as n,aq as i,y as a,q as h}from"./chunks/framework.jAttmLhR.js";const F=JSON.parse('{"title":"shell","description":"","frontmatter":{},"headers":[],"relativePath":"knowledge-lib/backend/shell.md","filePath":"knowledge-lib/backend/shell.md"}'),t={name:"knowledge-lib/backend/shell.md"};function p(e,s,k,d,r,g){return h(),n("div",null,s[0]||(s[0]=[i(`<h1 id="shell" tabindex="-1">shell <a class="header-anchor" href="#shell" aria-label="Permalink to &quot;shell&quot;">​</a></h1><h2 id="window上运行" tabindex="-1">window上运行 <a class="header-anchor" href="#window上运行" aria-label="Permalink to &quot;window上运行&quot;">​</a></h2><ul><li>配置环境，利用git的bash执行,配置vscode插件code runner</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">&quot;code-runner.executorMap&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> {</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">  &quot;shellscript&quot;</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;  &amp; </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">D:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\\\</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Program Files</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\\\</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Git</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\\\</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">bin</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\\\</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">bash.exe</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;,</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>注意，不要再sh头部指定编译器，否则会覆盖code runner配置</p><ul><li>借助wsl，安装window的wsl和并在商店中安装Ubuntu 并打开 借助wsl命令可以直接执行</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> wsl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sh</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /mnt/host/d/project/new-te-se-ku/scripts/lessc.sh</span></span></code></pre></div><h2 id="基础" tabindex="-1">基础 <a class="header-anchor" href="#基础" aria-label="Permalink to &quot;基础&quot;">​</a></h2><h3 id="变量" tabindex="-1">变量 <a class="header-anchor" href="#变量" aria-label="Permalink to &quot;变量&quot;">​</a></h3><p>直接定义，注意=前后不要为了美观添加多余空格，shell中空格一般用来分割参数或者命令符</p><p>使用时只需在变量名前加上$，或者\${}, 花括号用来明确边界，可以在字符串拼接式使用，必须用“”包裹，‘’只会当作字符打印</p><p><code>readyonly var</code> 将var标记为只读变量，重新赋值会报错 <code>unset var</code> 删除变量</p><p>特殊变量：<code>$PATH</code>表示环境变量 例如 <code>$0</code> 表示脚本的名称，<code>$1</code>, <code>$2</code>, 等表示脚本的参数。 <code>$#</code>表示传递给脚本的参数数量，<code>$?</code> 表示上一个命令的退出状态等</p><h3 id="字符串" tabindex="-1">字符串 <a class="header-anchor" href="#字符串" aria-label="Permalink to &quot;字符串&quot;">​</a></h3><p>字符串长度\${#string} 字符串分割\${string:1:4} 获取string从0开始第1到第4的字符</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">查找字符</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 或</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> o</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 的位置</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">哪个字母先出现就计算哪个</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">：</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">string</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;runoob is a great site&quot;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> \`</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">expr</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> index &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$string</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot; io\`</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  # 输出 4</span></span></code></pre></div><h3 id="数组" tabindex="-1">数组 <a class="header-anchor" href="#数组" aria-label="Permalink to &quot;数组&quot;">​</a></h3><p>用括号来表示数组，数组元素用&quot;空格&quot;符号分割开</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">array_name</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">value0</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> value1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> value2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> value3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">array_name[0]</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">value0</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">valuen</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\${array_name[n]}</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> \${array_name[</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">@</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">]}   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 获取数组所有内容</span></span></code></pre></div><h3 id="运算符" tabindex="-1">运算符 <a class="header-anchor" href="#运算符" aria-label="Permalink to &quot;运算符&quot;">​</a></h3><ul><li>原生bash不支持简单的数学运算，expr 是一款表达式计算工具，使用它能完成表达式的求值操作</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">val</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">expr</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">val</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$((</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> +</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 3</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">))</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;两数之和为 : </span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$val</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span></span></code></pre></div><ul><li>关系运算 <code>$a -eq $b</code><ul><li>-eq 相等</li><li>-ne 不相等</li><li>-gt 大于</li><li>-lt 小于</li><li>-ge &gt;=</li><li>-le &lt;=</li></ul></li><li>布尔运算符 <ul><li>!= 不等于</li><li>== 等于</li><li>-o 或 ||</li><li>-a 和 &amp;&amp;</li></ul></li><li>字符串运算符 <ul><li>= 两个字符串相等</li><li>!= 不相等</li><li>-z 是否为空</li><li>-n 是否不为空</li></ul></li></ul><h3 id="流程控制" tabindex="-1">流程控制 <a class="header-anchor" href="#流程控制" aria-label="Permalink to &quot;流程控制&quot;">​</a></h3><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">if</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> condition1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">then</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    command1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">elif</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> condition2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">then</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    command2</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">else</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    commandN</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">fi</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> var </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> item1</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> item2</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ...</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> itemN</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">do</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    command1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    command2</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    ...</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">    commandN</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">done</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">while</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> condition</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">do</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    command</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">done</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">until</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> condition</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">do</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    command</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">done</span></span></code></pre></div><h3 id="其它" tabindex="-1">其它 <a class="header-anchor" href="#其它" aria-label="Permalink to &quot;其它&quot;">​</a></h3><p><strong>将./css文件夹下所有less编译成同名css</strong></p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">find</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./css</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -name</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;*.less&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> while</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> read</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> file</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">; </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">do</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">   lessc</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$file</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">file</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">less</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}.css&quot;</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">done</span></span></code></pre></div><ul><li><code>|</code>运算符</li></ul><p>管道符号，是unix一个很强大的功能,符号为一条竖线:&quot;|&quot;。用法: command 1 | command 2 他的功能是把第一个命令command 1执行的结果作为command2的输入传给command 2</p><ul><li>read</li></ul><p>读取输入的一行数据，在这里将其命名为file 参数扩展语法： 将file变量的值中的&quot;.less&quot;部分替换为&quot;.css&quot;，从而生成对应的CSS文件名。具体来说，&quot;{file%.less}&quot;表示删除file变量值结尾的&quot;.less&quot;分，然后再加上&quot;.css&quot;后缀，最终得到对应的CSS文件名</p><h4 id="符调用变量就是一种参数扩展" tabindex="-1"><code>$</code>符调用变量就是一种参数扩展 <a class="header-anchor" href="#符调用变量就是一种参数扩展" aria-label="Permalink to &quot;\`$\`符调用变量就是一种参数扩展&quot;">​</a></h4>`,33),a("ul",null,[a("li",{"!var":""},"间接参数扩展:$")],-1),i('<div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">b</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">10</span></span>\n<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">b</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $a    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#b</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ${</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">a}  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#10</span></span></code></pre></div><ul><li>大小写修改：</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ${a^}     </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 替换变量a中的第一个小写字母为大写</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ${a^^}  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 替换变量a中的所有小写字母为大写</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ${b,}     </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 替换变量b中的第一个大写字母为小写</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ${b,,}    </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 替换变量b中的所有大写字母为小写</span></span></code></pre></div><ul><li>变量名扩展</li></ul><p>${!a*} 列出所有以a开头的变量名</p><ul><li>掐头去尾</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">${a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">#*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：}  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 对a的值以:为分隔符进行最短掐头</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">${a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">##*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：}  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 对a的值以:为分隔符进行最长掐头</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ${a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%:*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}   </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 对a的值以:为分隔符进行最短去尾</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ${a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">%%:*</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 对a的值以:为分隔符进行最长去尾</span></span></code></pre></div><ul><li>替换</li></ul><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ${a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">is</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mm}  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#最短替换，用mm替换匹配的第一个is</span></span>\n<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">echo</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ${a</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">//</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">is</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">/</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">mm}  </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#最长替换，用mm替换所有匹配的is</span></span></code></pre></div>',9)]))}const c=l(t,[["render",p]]);export{F as __pageData,c as default};
