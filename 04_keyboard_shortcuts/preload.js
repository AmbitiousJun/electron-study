const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('listeners', {
  onHelpMenuClick(callback = () => {}) { ipcRenderer.on('help-menu-click', callback) }
})