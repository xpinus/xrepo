# qiankun 

[乾坤(qiankun)实现沙箱机制，看这篇就够了](https://juejin.cn/post/7431455846150242354?searchId=202502192140290596B8A52033D170D738)
[深入调研了微前端，还是iframe最香](https://juejin.cn/post/7244070072788287544?searchId=202502192140290596B8A52033D170D738)


qiankun基于single-spa进行了二次开发

主应用：只需要输入子应用的html入口

子应用：与single-spa基本一致，导出了三个生命周期函数。

js隔离

Proxy沙箱，它将window上的所有属性遍历拷贝生成一个新的fakeWindow对象，紧接着使用proxy代理这个fakeWindow，用户对window操作全部被拦截下来，只作用于在这个fakeWindow之上

css隔离

ShadowDOM样式沙箱会被开启。在这种模式下 qiankun 会为每个微应用的容器包裹上一个 shadow dom 节点，从而确保微应用的样式不会对全局造成影响。
Scoped CSS，qiankun会遍历子应用中所有的CSS选择器，通过对选择器前缀添加一个固定的带有该子应用标识的属性选择器的方式来限制其生效范围，从而避免子应用间、主应用与子应用的样式相互污染。
但如果用户在运行时引入了新的外联样式或者自行创建了新的内联标签，那么qiankun并不会做出反应

qiankun在框架内部预先设计实现了完善的发布订阅模式
