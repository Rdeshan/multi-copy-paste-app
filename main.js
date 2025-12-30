const { app, BrowserWindow, globalShortcut, clipboard } = require('electron')

let mainWindow
let slots = {} // {1: "text", 2: "text"}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 200,
    show: false // background app
  })
}

app.whenReady().then(() => {
  createWindow()

  // COPY to slot 1
  globalShortcut.register('Control+Shift+1', () => {
    slots[1] = clipboard.readText()
    console.log('Saved to slot 1')
  })

  // COPY to slot 2
  globalShortcut.register('Control+Shift+2', () => {
    slots[2] = clipboard.readText()
    console.log('Saved to slot 2')
  })

  // PASTE slot 1
  globalShortcut.register('Control+Alt+1', () => {
    if (slots[1]) clipboard.writeText(slots[1])
  })

  // PASTE slot 2
  globalShortcut.register('Control+Alt+2', () => {
    if (slots[2]) clipboard.writeText(slots[2])
  })
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})
