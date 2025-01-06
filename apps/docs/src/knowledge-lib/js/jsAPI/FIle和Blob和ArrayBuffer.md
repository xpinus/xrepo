# File和Blob和ArrayBuffer
> JavaScript 在处理文件、二进制数据和数据转换时，提供了一系列的 API 和对象
> 比如 `File`、`Blob`、`FileReader`、`ArrayBuffer`、`Base64`、`Object URL` 和 `DataURL`

[前端中的 File 和 Blob两个对象到底有什么不同](https://juejin.cn/post/7413921824066551842)
[js二进制及其相关转换全总结(File、Blob、FileReader、ArrayBuffer、Base64、Object URL、DataURL...)](https://juejin.cn/post/7395866692798201871)

## Blob

> 在 JavaScript 中，Blob（Binary Large Object）对象用于表示不可变的、原始的二进制数据。 它可以用来存储文件、图片、音频、视频、甚至是纯文本等各种类型的数据。
> Blob 提供了一种高效的方式来操作数据文件，而不需要将数据全部加载到内存中，这在处理大型文件或二进制数据时非常有用。

### 创建

```js
// blobParts: 一个数组，包含将被放入 Blob 对象中的数据，可以是字符串、数组缓冲区（ArrayBuffer）、TypedArray、Blob 对象等
// options: 一个可选的对象，可以设置 type（MIME 类型）和 endings（用于表示换行符）
// const blob = new Blob(blobParts, options);

const blob = new Blob(["Hello, world!"], { type: "text/plain" });
```

主要属性：
- size: 返回 Blob 对象的大小（以字节为单位）
- type: 返回 Blob 对象的 MIME 类型

主要方法：
- slice： 从 Blob 中提取一部分数据，并返回一个新的 Blob 对象。参数 start 和 end 表示提取的字节范围
- text: 读取为文本字符串，返回一个 Promise
- arrayBuffer：读取为 ArrayBuffer 对象，适合处理二进制数据，返回一个 Promise
- stream：作为一个 ReadableStream 返回，允许你以流的方式处理数据，适合处理大文件

使用场景：
1. 生成文件下载
```js
const blob = new Blob(["This is a test file."], { type: "text/plain" });
const url = URL.createObjectURL(blob); // 创建一个 Blob URL
const a = document.createElement("a");
a.href = url;
a.download = "test.txt";
a.click();
URL.revokeObjectURL(url); // 释放 URL 对象
```
2. 上传文件
通过 FormData 对象将 Blob 作为文件上传到服务器
```js
const formData = new FormData();
formData.append("file", blob, "example.txt");

fetch("/upload", {
    method: "POST",
    body: formData,
}).then((response) => {
    console.log("File uploaded successfully");
});
 // 释放 URL 对象
```
3. 读取图片或其他文件
4. Blob 和 Base64


