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

## [fetch发送2次请求的原因](https://blog.nowcoder.net/n/4c9fbf7fdaa44eba91d05eb626d0242d?from=nowcoder_improve#:~:text=fetch%20%E5%8F%91%E9%80%81post%20%E8%AF%B7%E6%B1%82%E7%9A%84%E6%97%B6%E5%80%99%EF%BC%8C%E6%80%BB%E6%98%AF%E5%8F%91%E9%80%812%20%E6%AC%A1%EF%BC%8C%E7%AC%AC%E4%B8%80%E6%AC%A1%E7%8A%B6%E6%80%81%E7%A0%81%E6%98%AF204%EF%BC%8C%E7%AC%AC%E4%BA%8C%E6%AC%A1%E6%89%8D%E6%88%90%E5%8A%9F%E3%80%82%20%E5%8E%9F%E5%9B%A0%E5%BE%88%E7%AE%80%E5%8D%95%EF%BC%8C%E5%9B%A0%E4%B8%BA%E4%BD%A0%E7%94%A8,fetch%20%E7%9A%84%20post%20%E8%AF%B7%E6%B1%82%E7%9A%84%E6%97%B6%E5%80%99%EF%BC%8Cfetch%20%E7%AC%AC%E4%B8%80%E6%AC%A1%E5%8F%91%E9%80%81%E4%BA%86%E4%B8%80%E4%B8%AA%20Options%E8%AF%B7%E6%B1%82%EF%BC%8C%E8%AF%A2%E9%97%AE%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%98%AF%E5%90%A6%E6%94%AF%E6%8C%81%E4%BF%AE%E6%94%B9%E7%9A%84%E8%AF%B7%E6%B1%82%E5%A4%B4%EF%BC%8C%E5%A6%82%E6%9E%9C%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%94%AF%E6%8C%81%EF%BC%8C%E5%88%99%E5%9C%A8%E7%AC%AC%E4%BA%8C%E6%AC%A1%E4%B8%AD%E5%8F%91%E9%80%81%E7%9C%9F%E6%AD%A3%E7%9A%84%E8%AF%B7%E6%B1%82%E3%80%82)