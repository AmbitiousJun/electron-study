const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')

const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  })
  win.loadFile('index.html')
}

app.whenReady().then(() => {
  // 处理主题切换事件
  ipcMain.handle('dark-mode:toggle', () => {
    nativeTheme.themeSource = nativeTheme.shouldUseDarkColors ? 'light' : 'dark'
    return nativeTheme.shouldUseDarkColors
  })
  // 处理系统默认主题事件
  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })

  createWindow()
  app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow())
})

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())