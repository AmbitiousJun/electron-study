const { app, BrowserWindow, Menu } = require('electron')

const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')
  
  // 创建一个新菜单
  const menu = Menu.buildFromTemplate([
    {
      label: 'Electron',
      submenu: [{
        role: 'help',
        accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Control+I',
        click() {
          // 发送一个事件给渲染进程
          win.webContents.send('help-menu-click')
        }
      }]
    }
  ])
  Menu.setApplicationMenu(menu)
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow())
})

app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit())