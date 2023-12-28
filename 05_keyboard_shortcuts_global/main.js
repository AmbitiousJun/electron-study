const { app, BrowserWindow, globalShortcut } = require('electron')

const path = require('node:path')

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	})
	win.loadFile("index.html")

	// 注册全局键盘快捷键监听事件
	globalShortcut.register("Alt+CommandOrControl+G", () => {
		// 通知渲染进程处理事件
		win.webContents.send('globalShortcut:Alt+CommandOrControl+G')

	})

}

app.whenReady().then(() => {
	// app 加载完成的时候，创建一个窗口
	createWindow()

}).then(() => {
	// 所有窗口关闭事件
	app.on('window-all-closed', () => {
		if (process.platform !== 'darwin') {
			app.quit()
		}
	})

	// app 激活事件
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0 && process.platform === 'darwin') {
			createWindow()
		}
	})

})