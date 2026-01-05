const { app, BrowserWindow, globalShortcut, clipboard, Tray, Menu, nativeImage, Notification } = require('electron');
const path = require('path');

// Store clipboard slots in memory
const clipboardSlots = {
  1: '',
  2: '',
  3: ''
};

let tray = null;
let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    icon: path.join(__dirname, 'assets', 'icon.png')
  });

  mainWindow.loadFile('index.html');
  
  // Hide window instead of closing (keep app running in tray)
  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });
}

function createTray() {
  // Create a simple icon for tray (you can replace with actual icon file)
  const icon = nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAdgAAAHYBTnsmCAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAFNSURBVDiNpdM9S8NAGMDx/5M0aVKbpjaptRZB6OLgIAhOnRycXBz8AH4BwQ/gB3Bw6uTWD+Ag4uQgDg6CUAcXQaGgRUFpbWJrm7RJmnuuQ6FIE6T4wN1xd7/7c9wdcP8KAO4Y4zgOiqKgKAqyLCPLMoIgIAgCkiQhSZJ3TdM0dF1H0zRs28a2bSzLwrIsLMtC13U0TcMwDDqdDo7jYJompmmiKAqKomDbNpZlYds2vu/j+z62bWNZFqZp0mq1aDQa1Ot1Go0GjuPQ7XbpdDq02216vR6WZdFsNqnVatRqNWq1GrVajV6vh23bdLtdut0uzWYT0zTp9/v0+30Mw6DX69HtdnFdF8MwGAwGDAYDDMPA8zw8z6PVatFqtXAch36/j2maDIdDhsMhhmEwGo0YjUa0220cx2E8HjMejxmNRnieh+d5TCYT/gD+ATPeBDuHGtORAAAAAElFTkSuQmCC');
  
  tray = new Tray(icon);
  tray.setToolTip('Multi Copy Paste App');
  
  updateTrayMenu();
  
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
  });
}

function updateTrayMenu() {
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Multi Copy Paste', enabled: false },
    { type: 'separator' },
    { 
      label: `Slot 1: ${clipboardSlots[1] ? clipboardSlots[1].substring(0, 30) + '...' : '(empty)'}`,
      click: () => pasteFromSlot(1)
    },
    { 
      label: `Slot 2: ${clipboardSlots[2] ? clipboardSlots[2].substring(0, 30) + '...' : '(empty)'}`,
      click: () => pasteFromSlot(2)
    },
    { 
      label: `Slot 3: ${clipboardSlots[3] ? clipboardSlots[3].substring(0, 30) + '...' : '(empty)'}`,
      click: () => pasteFromSlot(3)
    },
    { type: 'separator' },
    { label: 'Clear Slot 1', click: () => clearSlot(1) },
    { label: 'Clear Slot 2', click: () => clearSlot(2) },
    { label: 'Clear Slot 3', click: () => clearSlot(3) },
    { type: 'separator' },
    { label: 'Show Window', click: () => mainWindow.show() },
    { label: 'Quit', click: () => { app.isQuitting = true; app.quit(); } }
  ]);
  
  tray.setContextMenu(contextMenu);
}

function copyToSlot(slotNumber) {
  // Get current clipboard content (what user just copied with Ctrl+C)
  const clipboardContent = clipboard.readText();
  
  if (clipboardContent) {
    clipboardSlots[slotNumber] = clipboardContent;
    
    // Show notification
    showNotification(`Slot ${slotNumber}`, `Copied: ${clipboardContent.substring(0, 50)}${clipboardContent.length > 50 ? '...' : ''}`);
    
    // Update tray menu
    updateTrayMenu();
    
    // Update window if visible
    if (mainWindow && mainWindow.isVisible()) {
      mainWindow.webContents.send('slots-updated', clipboardSlots);
    }
  }
}

function pasteFromSlot(slotNumber) {
  const content = clipboardSlots[slotNumber];
  
  if (content) {
    // Write to system clipboard
    clipboard.writeText(content);
    
    // Show notification
    showNotification(`Slot ${slotNumber}`, `Ready to paste: ${content.substring(0, 50)}${content.length > 50 ? '...' : ''}`);
  } else {
    showNotification(`Slot ${slotNumber}`, 'Empty slot!');
  }
}

function clearSlot(slotNumber) {
  clipboardSlots[slotNumber] = '';
  updateTrayMenu();
  showNotification(`Slot ${slotNumber}`, 'Cleared');
  
  if (mainWindow && mainWindow.isVisible()) {
    mainWindow.webContents.send('slots-updated', clipboardSlots);
  }
}

function showNotification(title, body) {
  if (Notification.isSupported()) {
    new Notification({
      title: title,
      body: body,
      silent: true
    }).show();
  }
}

function registerShortcuts() {
  // Copy shortcuts: Ctrl+C+1, Ctrl+C+2, Ctrl+C+3
  globalShortcut.register('CommandOrControl+C+1', () => {
    setTimeout(() => copyToSlot(1), 100); // Delay to let system clipboard update
  });
  
  globalShortcut.register('CommandOrControl+C+2', () => {
    setTimeout(() => copyToSlot(2), 100);
  });
  
  globalShortcut.register('CommandOrControl+C+3', () => {
    setTimeout(() => copyToSlot(3), 100);
  });
  
  // Paste shortcuts: Alt+1, Alt+2, Alt+3 (changed to avoid conflicts)
  globalShortcut.register('Alt+1', () => {
    pasteFromSlot(1);
  });
  
  globalShortcut.register('Alt+2', () => {
    pasteFromSlot(2);
  });
  
  globalShortcut.register('Alt+3', () => {
    pasteFromSlot(3);
  });
  
  console.log('✅ All shortcuts registered successfully!');
  console.log('📋 Copy: Ctrl+C+1/2/3');
  console.log('📝 Paste: Alt+1/2/3');
}

function unregisterShortcuts() {
  globalShortcut.unregisterAll();
  console.log('❌ All shortcuts unregistered');
}

// App lifecycle events
app.whenReady().then(() => {
  createWindow();
  createTray();
  registerShortcuts();
  
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // Don't quit on window close, keep running in tray
  // Only quit when explicitly requested
});

app.on('will-quit', () => {
  unregisterShortcuts();
});

app.on('before-quit', () => {
  app.isQuitting = true;
});
