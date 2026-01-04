const { app, BrowserWindow, globalShortcut, clipboard } = require('electron')
const path = require('path')

let mainWindow

const clipboardSlots = {}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')
}

function registerClipboardShortcuts() {
  // Register copy shortcuts: Ctrl+C+1 through Ctrl+C+9
  for (let i = 1; i <= 9; i++) {
    globalShortcut.register(`CommandOrControl+C+${i}`, () => {
      // Wait a moment for any pending clipboard operation
      setTimeout(() => {
        const currentText = clipboard.readText()
        if (currentText && currentText.trim()) {
          clipboardSlots[i] = currentText
          console.log(`Slot ${i} saved: "${currentText.substring(0, 30)}..."`)
          if (mainWindow) {
            mainWindow.webContents.send('notification', `Saved to slot ${i}`)
          }
        } else {
          console.log(`Nothing to copy to slot ${i}`)
        }
      }, 50)
    })
  }

  // Register paste shortcuts: Ctrl+V+1 through Ctrl+V+9
  for (let i = 1; i <= 9; i++) {
    globalShortcut.register(`CommandOrControl+V+${i}`, () => {
      if (clipboardSlots[i]) {
        clipboard.writeText(clipboardSlots[i])
        console.log(`Slot ${i} ready to paste: "${clipboardSlots[i].substring(0, 30)}..." (Press Ctrl+V)`)
        if (mainWindow) {
          mainWindow.webContents.send('notification', `Slot ${i} ready - Press Ctrl+V`)
        }
      } else {
        console.log(`Slot ${i} is empty`)
      }
    })
  }
}

app.whenReady().then(() => {
  createWindow()
  registerClipboardShortcuts()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})
