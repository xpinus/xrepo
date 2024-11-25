---
sort: 43
---

# offsetWidth/offsetHeight,clientWidth/clientHeight与scrollWidth/scrollHeight的区别

- `offsetWidth/offsetHeight`偏移量：
  - 返回值包含**content + padding + border**，效果与e.getBoundingClientRect()相同
  - ![img](https://img-blog.csdn.net/20180806142425483?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zNzg2MTMyNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
- `clientWidth/clientHeight`客户区大小：
  - 返回值只包含**content + padding**，如果有滚动条，也**不包含滚动条**
  - ![img](https://img-blog.csdn.net/20180806142642108?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zNzg2MTMyNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
- `scrollWidth/scrollHeight`包含滚动内容的元素的大小：
  - 返回值包含**content + padding + 溢出内容的尺寸**
  - ![img](https://img-blog.csdn.net/20180806142830874?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl8zNzg2MTMyNg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

