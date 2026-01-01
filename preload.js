const { contextBridge, clipboard } = require('electron')

contextBridge.exposeInMainWorld('clipboardAPI', {
  readText: () => clipboard.readText(),
  writeText: (text) => clipboard.writeText(text)
})
