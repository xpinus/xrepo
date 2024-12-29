# SEO优化

* 合理的`title`、`desciption`、`keywords`: 搜索引擎对着三项的权重逐个减小，`title`值强调重点即可，重要关键词出现不要超过2次，而且要靠前，不同页面`title`要有所不同；`description`把页面内容高度概括，长度合适，不可过分堆砌关键词，不同页面`description`有所不同；`keywords`列举出重要关键词即可

- 语义化的`HTML`代码，符合W3C规范：语义化代码让搜索引擎容易理解网页
- 重要内容`HTML`代码放在最前：搜索引擎抓取`HTML`顺序是从上到下，有的搜索引擎对抓取长度有限制，保证重要内容一定会被抓取
- 重要内容不要用`js`输出：爬虫不会执行js获取内容
- 少用`iframe`：搜索引擎不会抓取`iframe`中的内容
- 非装饰性图片必须加`alt`
- 提高网站速度：网站速度是搜索引擎排序的一个重要指标

## 页面结构优化 
- 语义化标签，语义化的`HTML`代码，符合W3C规范：语义化代码让搜索引擎容易理解网页；

## 内容优化

保证关键词的覆盖率

## 技术向
- 站点地图
```txt
# robot.txt
User-agent: *
Disallow: /private/

Sitemap: http://www.example.com/sitemap.xml
```
- 结构化数据
```html
<script type="application/ld+json">
    {
        "@context": "http://schema.org",
        "@type": "Organization",
        "name": "My Organization",
        "url": "http://www.example.com",
        "logo": "http://www.example.com/logo.jpg"
    }
</script>
``` 
- 移动端兼容处理
- 性能优化