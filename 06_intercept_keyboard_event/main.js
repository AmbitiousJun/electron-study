const { app, BrowserWindow } = require('electron')

const createWindow = () => {
	const win = new BrowserWindow({
		width: 800,
		height: 600
	})
	win.loadFile("index.html")

	// 拦截键盘输入
	win.webContents.on('before-input-event', (event, input) => {
		if (input.control && input.key.toLowerCase() === 'i') {
			console.log('Press Control+I')
			event.preventDefault()
		}

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