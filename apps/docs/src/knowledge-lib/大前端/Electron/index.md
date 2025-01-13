# [Electron](https://www.electronjs.org/zh/docs/latest/tutorial/quick-start)
> Electron是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。 嵌入 Chromium 和 Node.js 到 二进制的 Electron 允许您保持一个 JavaScript 代码代码库并创建跨平台应用.
> Electron 目前只支持三个平台：win32 (Windows), linux (Linux) 和 darwin (macOS).

## 教程

### BrowserWindow
> 在 Electron 中，每个窗口展示一个页面，后者可以来自本地的 HTML，也可以来自远程 URL。

```js
const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html'); // 您应用中的每个页面都在一个单独的进程中运行，我们称这些进程为 渲染器 (renderer) 
}

app.whenReady().then(() => {
  createWindow();
  
  // 如果没有窗口打开则打开一个窗口 (macOS)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 关闭所有窗口时退出应用 (Windows & Linux)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
```
### 预加载脚本
> Electron 的主进程是一个拥有着完全操作系统访问权限的 Node.js 环境, 出于安全原因，渲染进程默认跑在网页页面上，而并非 Node.js里,为了将 Electron 的不同类型的进程桥接在一起，我们需要使用被称为 预加载 的特殊脚本

- 预加载脚本运行在具有 HTML DOM 和 Node.js、Electron API 的有限子集访问权限的环境中
- 预加载脚本在渲染器加载网页之前注入

```js
const { contextBridge } = require('electron')

// 将应用中的 Chrome、Node、Electron 版本号暴露至渲染器的预加载脚本
contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron
  // 除函数之外，我们也可以暴露变量
})
```



## 流程

### 流程模型

> Electron 继承了来自 Chromium 的多进程架构，这使得此框架在架构上非常相似于一个现代的网页浏览器.

- 主进程：每个 Electron 应用都有一个单一的主进程，作为应用程序的入口点。 主进程在 Node.js 环境中运行，这意味着它具有 require 模块和使用所有 Node.js API 的能力
  - 窗口管理
  - 控制应用程序的生命周期
  - 控制原生API
- 渲染线程
  - 为每个打开的BrowserWindow生成一个单独的渲染器进程
- Preload脚本： 预加载（preload）脚本包含了那些执行于渲染器进程中，且先于网页内容开始加载的代码
- 效率进程： An Electron app can always prefer the UtilityProcess API over Node.js child_process.fork API when there is need to fork a child process from the main process
- 默认情况下已启用上下文隔离, 上下文隔离功能将确保您的 预加载脚本 和 Electron的内部逻辑 运行在所加载的 webcontent网页 之外的另一个独立的上下文环境里
- 进程沙盒化

### 进程间通信 IPC
> 使用 Electron 的 ipcMain 模块和 ipcRenderer 模块来进行进程间通信

```js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  ping: () => ipcRenderer.invoke('ping')  // 给渲染器进程添加一个可以出发事件的变量
})
```

```js
const { ipcMain } = require('electron/main')

// 在app ready后，渲染进程之前
ipcMain.handle('ping', () => 'pong')  // 主进程添加对应的处理函数
```

1. 渲染器进程到主进程（单向）
`ipcRenderer.send`
2. 渲染器进程到主进程（双向）
`ipcRenderer.invoke`
3. 主进程到渲染器进程
`webContents.send`API 将 IPC 消息从主进程发送到目标渲染器
在preload.js中通过`ipcRenderer.on`绑定用于注册响应事件的
函数
4. 渲染器进程到渲染器进程，没有直接方法
   1. 将主进程作为渲染器之间的消息代理
   2. 使用MessagePort. 这将允许在初始设置后渲染器之间直接进行通信。

### 消息端口 MessagePort
> 允许在不同上下文之间传递消息的Web功能。 就像 window.postMessage, 但是在不同的通道上
```js
// 消息端口是成对创建的。 连接的一对消息端口
// 被称为通道。
const channel = new MessageChannel()    // 在主进程中使用MessageChannelMain

// port1 和 port2 之间唯一的不同是你如何使用它们。 消息
// 发送到port1 将被port2 接收，反之亦然。
const port1 = channel.port1
const port2 = channel.port2

// 允许在另一端还没有注册监听器的情况下就通过通道向其发送消息
// 消息将排队等待，直到一个监听器注册为止。
port2.postMessage({ answer: 42 })

// 这次我们通过 ipc 向主进程发送 port1 对象。 类似的，
// 我们也可以发送 MessagePorts 到其他 frames, 或发送到 Web Workers, 等.
ipcRenderer.postMessage('port', null, [port1])   // main中使用ipcMain.on处理
```
## 实例

### DarkMode
`nativeTheme `
### 设备访问
### 键盘快捷键
### 多线程
> 需把webPreferences中的nodeIntegrationInWorker选项设置为true
> 所有的Electron内置模块不可以用在多线程环境中
### 原生文件拖放
### 导航历史 navigation history
### 通知 Notifications
### 离屏渲染
### onLine网络
### 进度条
> 进度条使窗口能够向用户提供其进度信息，而无需被切换到前台
### Tray托盘图标
> 在 MacOS 和 Ubuntu, 托盘将位于屏幕右上角上，靠近你的电池和 wifi 图标。 在 Windows 上，托盘通常位于右下角

## electron中用到了哪些系统api

- 文件系统：使用nodejs的fs模块来进行文件系统的操作
- 操作系统信息：使用nodejs的os模块来获取操作系统信息
- 网络请求
- 进程控制：使用nodejs的child_process模块来进行进程控制
- 系统通知：electron的notification模块来进行系统通知
- 剪贴板：electron的clipboard模块来进行剪贴板操作
- 系统托盘：electron的tray模块来进行系统托盘操作
- 系统菜单：electron的menu模块来进行系统菜单操作
- 原生窗口操作
- 打开文件对话框：electron的dialog模块来进行文件对话框操作
- 系统级快捷键：electron的globalShortcut模块来进行系统级快捷键操作


