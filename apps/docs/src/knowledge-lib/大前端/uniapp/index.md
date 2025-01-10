# [uni-app](https://uniapp.dcloud.net.cn/tutorial/)

- 页面文件遵循[Vue单文件组件 (SFC)](https://vue-loader.vuejs.org/zh/spec.html) 规范，即每个页面是一个.vue文件
- 组件标签靠近小程序规范，详见[uni-app 组件规范](https://uniapp.dcloud.net.cn/component/)
- 接口能力（JS API）靠近小程序规范，但需将前缀 wx、my 等替换为 uni，详见[uni-app接口规范](https://uniapp.dcloud.net.cn/api/)
- 数据绑定及事件处理同 Vue.js 规范，同时补充了[应用生命周期](https://uniapp.dcloud.net.cn/collocation/App.html#applifecycle)及[页面的生命周期](https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle)
- 如需兼容app-nvue平台，建议使用flex布局进行开发

- uni-app分`编译器`和`运行时（runtime）`。uni-app能实现一套代码、多端运行，是通过这2部分配合完成的。
  - `编译器`将开发者的代码进行编译，编译的输出物由各个终端的`runtime`进行解析
  - 每个平台（Web、Android App、iOS App、各家小程序）都有各自的`runtime`


