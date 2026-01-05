# Multi Copy Paste Electron App

A desktop application that allows you to copy multiple text items into different slots and paste them using keyboard shortcuts.

## 🚀 Features

- **3 Independent Clipboard Slots**: Store different text items simultaneously
- **Global Keyboard Shortcuts**: Work across all applications
- **System Tray Integration**: Runs in background with tray menu
- **Visual Notifications**: Get feedback when copying/pasting
- **Offline Support**: Works completely offline
- **Clean UI**: View and manage your clipboard slots

## 📋 Keyboard Shortcuts

### Copy to Slots
- `Ctrl+C+1` - Copy selected text to Slot 1
- `Ctrl+C+2` - Copy selected text to Slot 2
- `Ctrl+C+3` - Copy selected text to Slot 3

### Paste from Slots
- `Ctrl+V+1` - Paste content from Slot 1
- `Ctrl+V+2` - Paste content from Slot 2
- `Ctrl+V+3` - Paste content from Slot 3

## 🛠️ Installation

1. Install dependencies:
```bash
npm install
```

2. Run the app:
```bash
npm start
```

## 📖 How It Works

1. **Copy**: Select any text in any application, then press `Ctrl+C+1/2/3` to save it to a slot
2. **Paste**: Press `Ctrl+V+1/2/3` to paste content from a specific slot
3. **View**: Click the tray icon or open the window to see all stored slots
4. **Clear**: Right-click tray icon or use the window to clear specific slots

## 🏗️ Project Structure

