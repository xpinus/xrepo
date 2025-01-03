<script setup>
import demo1 from './demoDefineProperty.vue';
import demo2 from './demoProxy.vue';
</script>

# 请简单实现双向数据绑定`mvvm`

## Object.defineProperty

<preview codePath="knowledge-lib/js/手写/双向数据绑定/demoDefineProperty.vue">
  <demo1 />
</preview>

## proxy实现

<preview codePath="knowledge-lib/js/手写/双向数据绑定/demoProxy.vue">
  <demo2 />
</preview>

##  优劣对比

Proxy 的优势如下:

- Proxy 可以直接监听对象而非属性；
- Proxy 可以直接监听数组的变化；
- Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
- Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
- Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

Object.defineProperty 的优势如下:

- 兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。