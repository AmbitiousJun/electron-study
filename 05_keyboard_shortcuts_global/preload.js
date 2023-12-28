const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('globalShortcut', {
  altControlG(callback = () => {}) { ipcRenderer.on('globalShortcut:Alt+CommandOrControl+G', () => callback && callback()) }
})