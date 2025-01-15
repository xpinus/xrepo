# audio

```html
<audio controls="controls">
  <source src="./test.mp4" type="audio/mpeg">
  <source src="./test.ogg" type="audio/ogg">
  您的浏览器不支持 audio 标签
</audio>
```

| 属性       | 	描述                            |
|----------|--------------------------------|
| src      | 	要播放的音频的 URL                   |
| controls | 	如果设置该属性，则向用户显示控件，例如播放按钮       |
| autoplay | 	如果设置该属性，则音频在就绪后马上播放           |
| loop     | 	如果设置该属性，则每当音频结束时重新开始播放        |
| muted    | 	规定音频输出应该被静音                   |
| preload  | 	如果设置该属性，则音频在页面加载时进行加载，并预备播放   |

| 音频格式 | 	MIME类型       |
|------|---------------|
| MP3  | 	audio/mpeg   |
| Ogg  | 	audio/ogg    |
| Wav  | 	audio/wav    |