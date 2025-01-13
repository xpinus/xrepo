---
sort: 47
---

# 媒体查询

媒体查询指的就是根据不同的媒体类型（设备类型）和条件来区分各种设备（例如：电脑、手机、平板电脑、盲文设备等），并为它们分别定义不同的 CSS 样式。媒体查询能让 CSS 可以更精确的作用于不同的设备或同一设备的不同条件，让所有用户都能得到很好的用户体验。

http://c.biancheng.net/css3/media.html

**媒体类型**

-  `all`	表示所有的媒体设备
-  `screen`	表示电脑显示器
-  `tty`	表示使用固定密度字母栅格的媒体，比如打字机或终端设备
-  ...

**媒体特性**

- `width`	页面可见区域的宽度
- `height`	页面可见区域的高度
- `color`	输出设备每个像素的比特值，常见的有 8、16、32 位。如果设备不支持输出彩色，则该值为 0
- ...

**逻辑操作符**

- `and`：用于将多个媒体查询组合成一条媒体查询，当每个查询规则都为真时则该条媒体查询为真，另外通过 and 操作符还可以将媒体特性与媒体类型结合在一起；
- `not`：用于否定媒体查询，当查询规则不为真时则返回 true，否则返回 false。如果使用 not 操作符，则还必须指定媒体类型；
- `only`：仅在整个查询匹配时才会生效，当不使用 only 时，旧版的浏览器会将 screen and (max-width: 500px) 简单地解释为 screen，忽略查询的其余部分，并将样式应用于所有屏幕。 如果使用 only 运算符，则还必须指定媒体类型。

**定义媒体查询**

> @media

```js
/* 在小于或等于 992 像素的屏幕上，将背景色设置为蓝色 */
@media screen and (max-width: 992px) {
  body {
    background-color: blue;
  }
}

/* 在 600 像素或更小的屏幕上，将背景色设置为橄榄色 */
@media screen and (max-width: 600px) {
  body {
    background-color: olive;
  }
}
```

> @import

```js
@import url("css/screen.css") screen;   /* 引入外部样式，该样式仅会应用于电脑显示器 */
@import url("css/print.css") print;     /* 引入外部样式，该样式仅会应用于打印设备 */
body {
    background: #f5f5f5;
    line-height: 1.2;
}
```

> media 属性
```html
/* 当页面宽度大于等于 900 像素时应用该样式 */
<link rel="stylesheet" media="screen and (min-width: 900px)" href="widescreen.css">
/* 当页面宽度小于等于 600 像素时应用该样式 */
<link rel="stylesheet" media="screen and (max-width: 600px)" href="smallscreen.css">
```

| 断点                | 类中缀    | 分辨率      |
|-------------------|--------|----------|
| X-Small           | None   | <576px   |
| Small             | sm     | ≥576px   | 
| Medium            | md     | ≥768px   |
| Large             | lg     | ≥992px   |            
| Extra large       | xl     | ≥1200px  |
| Extra extra large | xxl    | ≥1400px  |           

