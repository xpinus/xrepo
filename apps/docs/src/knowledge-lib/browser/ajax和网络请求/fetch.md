# Fetch

符合关注分离，没有将输入、输出和用事件来跟踪的状态混杂在一个对象里
更好更方便的写法
更加底层，提供的API丰富（request, response）
脱离了XHR，是ES规范里新的实现方式
1）fetchtch只对网络请求报错，对400，500都当做成功的请求，需要封装去处理
2）fetch默认不会带cookie，需要添加配置项
3）fetch不支持abort，不支持超时控制，使用setTimeout及Promise.reject的实现的超时控制并不能阻止请求过程继续在后台运行，造成了量的浪费
4）fetch没有办法原生监测请求的进度，而XHR可以


## 基础
### 请求参数
- url
- options
  - method
  - body
  - headers
  - ...

## [fetch发送2次请求的原因](https://blog.csdn.net/u012149969/article/details/108172195)

之所以会发送2次请求，那是因为我们使用了**带预检(Preflighted)**的跨域请求。该请求会在发送真实的请求之前发送一个类型为OPTIONS的预检请求。预检请求会检测服务器是否支持我们的真实请求所需要的跨域资源，唯有资源满足条件才会发送真实的请求。比如我们在请求头部增加了authorization项，那么在服务器响应头中需要放入Access-Control-Allow-Headers，并且其值中必须要包含authorization，否则OPTIONS预检会失败，从而导致不会发送真实的请求。
