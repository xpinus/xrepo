# [Electron](https://www.electronjs.org/zh/docs/latest/tutorial/quick-start)
> Electron是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。 嵌入 Chromium 和 Node.js 到 二进制的 Electron 允许您保持一个 JavaScript 代码代码库并创建 在Windows上运行的跨平台应用 macOS和Linux



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


<<< ./基于electron和playwright的测试软件.md