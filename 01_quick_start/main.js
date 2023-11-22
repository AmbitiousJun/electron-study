const { app, BrowserWindow } = require('electron')

// 创建一个新窗口
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })
    // 把 index.html 页面加载到窗口中
    win.loadFile('index.html')
}

// 等待 app 触发 ready 事件之后才能创建新窗口
app.whenReady().then(() => {
    createWindow()
    // 适配 MacOS
    app.on('activate', () => {
        // Mac 中有可能出现程序正在运行但没有窗口的情况
        if (BrowserWindow.getAllWindows.length === 0) createWindow()
    })
})

// 当用户关闭掉所有的窗口时，就退出程序
app.on('window-all-closed', () => {
    // 排除 MacOS
    if (process.platform !== 'darwin') app.quit()
})