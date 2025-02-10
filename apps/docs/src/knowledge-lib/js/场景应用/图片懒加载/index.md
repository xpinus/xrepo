# 懒加载

> 当元素出现在可视区域的时候再加载。

懒加载核心原理：img 元素在 src 属性有值时，才会去请求对应的图片地址，那么我们可以先给图片一张默认的占位图：
```html
<img src="占位图.png" data-src="图片真实地址" />
```
之后判断当然这个 img 元素有没有进入可视区域，如果进入了，就把 data-src 的值赋给 src，让真实的图片显示出来。

关键在于检查元素可见性

## 监听页面的滚动（旧方案）

当 img 标签的顶部到可视区域顶部的距离，小于可视区域高度的时候，我们就认为图片进入了可视区域

```js
window.addEventListener("scroll", () => {
  const img = document.querySelectorAll('img')
  img.forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top < document.body.clientHeight) {
      // 当前这张图片进入到可视区域, 做 src 的替换
      img.src = img.dataset.src
    }
  })
})
```

## IntersectionObserver
IntersectionObserver 是一个现代浏览器 API，用于检测一个元素（或其子元素）相对于视口或某个祖先元素的可见性变化。
```js
const ob = new IntersectionObserver(callback, options);
```
- callback: 当被观察元素的可见性变化时调用的回调函数，callback 一开始会触发一次，确认当前的可视状态（无论当前是可见还是不可见），之后在每次可视状态发生改变时会触发。回调函数里面有两个参数：
  - entries: 一个数组，包含所有被观察元素的 IntersectionObserverEntry 对象，每个对象包含以下属性：
    - boundingClientRect: 被观察元素的矩形区域信息。
    - intersectionRatio: 被观察元素的可见部分与整个元素的比例。
    - intersectionRect: 可见部分的矩形区域信息。
    - isIntersecting: 布尔值，表示元素是否与根元素相交。
    - rootBounds: 根元素的矩形区域信息。
    - target: 被观察的目标元素。
    - time: 触发回调的时间戳。
  - observer: IntersectionObserver 实例本身。
- options: 配置对象，用于定制观察行为
  - root：指定用作视口的元素。默认值为 null，表示使用浏览器视口作为根元素。
  - rootMargin: 类似于 CSS 的 margin 属性，定义根元素的外边距，用于扩展或缩小根元素的判定区域。可以用像素或百分比表示，例如 '10px' 或 '10%'。
  - threshold: 是一个 0～1 之间的值，表示一个触发的阈值，如果是 0，只要目标元素一碰到 root 元素，就会触发，如果是1，表示目标元素完全进入 root 元素范围，才会触发。设置观察元素进入到根元素的百分比。

```js
let observer = new IntersectionObserver(
  (entries, observer) => {
    for(const entrie of entries){
      if(entrie.isIntersection){
        // 进入此分支，说明当前的图片和根元素产生了交叉
        const img = entrie.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    }
  },
  {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.5
  }
);

// 先拿到所有的图片元素
const imgs = document.querySelectorAll("img");
imgs.forEach((img) => {
  //观察所有的图片元素
  observer.observe(img);
});
```

