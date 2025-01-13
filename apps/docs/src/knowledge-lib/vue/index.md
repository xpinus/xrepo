
vue v-for帮我们做好了事件代理

## filter 过滤器

## vuex和pinia的区别

pinia: 响应式、store分离、类型安全、热更新、持久化

## 如何获得v-for生成的批量ref

```js
const itemRefs = [];

const setItemRef = (el) => {
    if (el) {
        itemRefs.push(el);
    }
};

// 
// <li v-for="(item, index) in list" :key="index" :ref="setItemRef">
```