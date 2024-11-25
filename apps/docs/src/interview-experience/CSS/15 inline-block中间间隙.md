---
sort: 15
---

# `display: inline-block`中间间隙

- 原因：`inline-block`元素间有空格或是换行，因此产生了间隙

- 如何消除：

  - 去除元素之间的空格或者换行，但会比较难看

  - 空格符本质上就是个字符，设置`font-size: 0`，但在`chrome`下无效，在`IE6\7`残留 1px 间隙

  - `letter-spacing`字符边距属性可以控制文字间的水平距离的，支持负值，可以让文字水平方向上重叠，但 Opera 支持不好

  - ```css
    .box {
    	font-size: 0;
    	letter-spacing: -3px;
    }
    ```

  - `margin-left`

  - 添加浮动，但还需要清除浮动的操作
