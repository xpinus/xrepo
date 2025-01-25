# 常见的 CSS 布局

## 三列布局

- 流体布局

```html
<div class="container">
	<div class="left"></div>
	<div class="right"></div>
	<div class="main"></div>
</div>
```

```css
.left {
	float: left;
	width: 100px;
	height: 200px;
	background: red;
}
.right {
	float: right;
	width: 200px;
	height: 200px;
	background: blue;
}
.main {
	margin-left: 120px;
	margin-right: 220px;
	height: 200px;
	background: green;
}
```

- 圣杯布局
  - 要求：三列布局；中间主体内容前置，且宽度自适应；两边内容定宽
    - 好处：重要的内容放在文档流前面可以优先渲染
    - 原理：利用相对定位、浮动、盒子内边距、**负外边距**布局，而不添加额外标签

```html
<div class="container">
	<div class="main">1</div>
	<div class="left">2</div>
	<div class="right">3</div>
</div>
```

```css
.container {
	padding-left: 150px;
	padding-right: 190px;
	hight: 100px;
}
.main {
	float: left;
	width: 100%;
	background: green;
}
.left {
	float: left;
	width: 150px;
	margin-left: -100%;
	position: relative;
	left: -150px;
	background: red;
}
.right {
	float: left;
	width: 190px;
	margin-left: -190px;
	position: relative;
	right: -190px;
	background: blue;
}
```

- 双飞翼布局
  - 双飞翼布局：对圣杯布局（使用相对定位，对以后布局有局限性）的改进，消除相对定位布局
  - 原理：主体元素上设置左右边距，预留两翼位置。左右两栏使用浮动和负边距归位，消除相对定位。

```html
<!-- 注意布局的特殊之处 -->
<div class="content">
	<div class="main"></div>
</div>
<div class="left"></div>
<div class="right"></div>
```

```css
.content {
	width: 100%;
	float: left; /* 浮动 */
}
.main {
	margin-left: 150px;
	margin-right: 190px;
}
.left {
	float: left; /* 浮动 */
	width: 150px;
	margin-left: -100%; /* 本来是向左移动整个window的距离，因为邻接的上一个盒子有浮动，因此移动了上一个盒子的宽度，跑到了最右侧 */
}
.right {
	float: left; /* 浮动 */
	width: 190px;
	margin-left: -190px;
}
```

## 两栏布局，左边宽度固定，右边自适应

- 左侧固定宽度，右侧自适应宽度的两列布局实现

```html
<div class="outer">
	<div class="left">固定宽度</div>
	<div class="right">自适应宽度</div>
</div>
```

> 在外层`div`（类名为`outer`）的`div`中，有两个子`div`，类名分别为`left`和`right`，其中`left`为固定宽度，而`right`为自适应宽度

**方法 1：左侧 div 设置成浮动：float: left，右侧 div 宽度会自拉升适应**

```css
.outer {
	width: 100%;
	height: 500px;
	background-color: yellow;
}
.left {
	width: 200px;
	height: 200px;
	background-color: red;
	float: left;
}
.right {
	height: 200px;
	background-color: blue;
}
```

**方法 2：对右侧:div 进行绝对定位，然后再设置 right=0，即可以实现宽度自适应**

> 绝对定位元素的第一个高级特性就是其具有自动伸缩的功能，当我们将 `width`设置为 `auto` 的时候（或者不设置，默认为 `auto` ），绝对定位元素会根据其 `left` 和 `right` 自动伸缩其大小

```css
.outer {
	width: 100%;
	height: 500px;
	background-color: yellow;
	position: relative;
}
.left {
	width: 200px;
	height: 200px;
	background-color: red;
}
.right {
	height: 200px;
	background-color: blue;
	position: absolute;
	left: 200px;
	top: 0;
	right: 0;
}
```

**方法 3：将左侧`div`进行绝对定位，然后右侧`div`设置`margin-left: 200px`**

```css
.outer {
	width: 100%;
	height: 500px;
	background-color: yellow;
	position: relative;
}
.left {
	width: 200px;
	height: 200px;
	background-color: red;
	position: absolute;
}
.right {
	height: 200px;
	background-color: blue;
	margin-left: 200px;
}
```

**方法 4：使用 flex 布局**

```css
.outer {
	width: 100%;
	height: 500px;
	background-color: yellow;
	display: flex;
	flex-direction: row;
}
.left {
	width: 200px;
	height: 200px;
	background-color: red;
}
.right {
	height: 200px;
	background-color: blue;
	flex: 1;
}
```

## 一个高度自适应的 div，里面有两个 div，一个高度 100px，希望另一个填满剩下的高度

- 方案 1：

  - `.sub { height: calc(100%-100px); }`

- 方案 2：

  - ```html
    <div class="container">
    	<div class="d1"></div>
    	<div class="sub">必须要有内容</div>
    </div>
    ```

  - `.container { position:relative; }`

  - `.sub { position: absolute; top: 100px; bottom: 0; }`

- 方案 3：

  - `.container { display:flex; flex-direction:column; }`
  - `.sub { flex:1; }`

## 瀑布流

https://juejin.cn/post/7013650466877898789
