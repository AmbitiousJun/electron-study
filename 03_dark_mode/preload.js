const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('darkMode', {
  toggle() { return ipcRenderer.invoke('dark-mode:toggle') },
  system() { return ipcRenderer.invoke('dark-mode:system') }
})