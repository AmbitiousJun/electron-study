const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld("versions", {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // 这里不能直接把整个 ipcRenderer 暴露给渲染进程，防止产生代码安全隐患
  ping: () => ipcRenderer.invoke('ping'),
  quit: () => ipcRenderer.invoke('quit')
})