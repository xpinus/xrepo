---
sort: 34
---
# 媒体标签video和audio

## video基础

```html
<video src="./test.mp4" controls="controls" width="700px" height="400px">
  浏览器不支持video
</video>
```

有些比较老的浏览器可能不支持 `<video>` 标签，放置文本内容，这样当某个浏览器不支持此标签时，就可以显示提示内容

`src`	将要播放的视频的 URL

`controls`	如果设置该属性，则向用户显示控件，例如播放按钮，音量按钮等

`autoplay`	如果设置该属性，则视频在就绪后马上播放，设置了 autoplay 后会忽略属性 preload

`width`	设置视频播放器的宽度

`height`	设置视频播放器的高度

`loop`	如果设置该属性，则当媒介文件完成播放后再次开始播放

`muted`	设置视频的音频输出应该被静音

`poster`	规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像

`preload`	如果设置该属性，则视频在页面加载时进行加载，并预备播放

**视频格式**
|视频格式 |	描述|
|---      |---|
|Ogg   |	带有 Theora 视频编码和 Vorbis 音频编码的 Ogg 文件|
|MPEG | 4（MP4）	带有 H.264 视频编码和 AAC 音频编码的 MPEG 4 文件|
|WebM |	带有 VP8 视频编码和 Vorbis 音频编码的 WebM 文件|

这三种视频格式，在不同的浏览器中兼容性不同，例如 MP4 格式不支持 Firefox 和 Opera 浏览器，Ogg 格式不支持IE、Safari 浏览器，WebM 格式不支持IE、Safari 浏览器等。所以我们可能需要在不同的浏览器中使用不同的视频格式，这需要用到 <source> 标签。

```html
<video controls="controls" width="700px" height="400px">
  <source src="./test.mp4" type="video/mp4">
  <source src="./test.ogg" type="video/ogg">
  您的浏览器不支持 video 标签
</video>
``````

## audio基础

```html
<audio controls="controls">
  <source src="./test.mp4" type="audio/mpeg">
  <source src="./test.ogg" type="audio/ogg">
  您的浏览器不支持 audio 标签
</audio>
```

|属性|	描述 |
| --- | --- |
|src|	要播放的音频的 URL
|controls|	如果设置该属性，则向用户显示控件，例如播放按钮
|autoplay|	如果设置该属性，则音频在就绪后马上播放
|loop|	如果设置该属性，则每当音频结束时重新开始播放
|muted|	规定音频输出应该被静音
|preload|	如果设置该属性，则音频在页面加载时进行加载，并预备播放

|音频格式|	MIME类型
| --- | --- |
|MP3|	audio/mpeg
|Ogg|	audio/ogg
|Wav|	audio/wav