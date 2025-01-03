# IOS适配问题

## 设置z-index不生效

```css
.sider{
    -webkit-transform: translateZ(1px);
  	-moz-transform: translateZ(1px);
    -o-transform: translateZ(1px);
    transform: translateZ(1px);
    z-index: 999;
 }
```