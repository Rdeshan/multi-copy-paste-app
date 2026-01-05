# 📋 Multi Copy Paste Electron App

A powerful desktop application that extends your clipboard functionality - copy multiple text items into different slots and paste them whenever you need using simple keyboard shortcuts.

## ✨ What Does This App Do?

Normally, you can only copy one item at a time. When you copy something new, the previous item is lost. This app gives you **3 clipboard slots** so you can:
- Copy 3 different texts and keep them all saved
- Paste any of them anytime you want
- No need to keep switching between windows to re-copy

**Perfect for:** Developers, writers, students, or anyone who copies/pastes frequently!

## 🚀 Features

- **3 Independent Clipboard Slots**: Store different text items simultaneously
- **Global Keyboard Shortcuts**: Work across ALL applications (Chrome, Notepad, Word, etc.)
- **System Tray Integration**: Runs quietly in background
- **Visual Notifications**: Get instant feedback when copying/pasting
- **100% Offline**: No internet required, completely private
- **Clean UI**: See what's stored in each slot

## 📋 Keyboard Shortcuts

### 📥 Copy to Slots (Save Text)
1. **Select any text** in any application
2. Press one of these combinations:
   - `Ctrl+C+1` - Save to Slot 1
   - `Ctrl+C+2` - Save to Slot 2
   - `Ctrl+C+3` - Save to Slot 3

### 📤 Paste from Slots (2-Step Process)
**Step 1:** Load slot to clipboard
- `Alt+1` - Load Slot 1 to clipboard
- `Alt+2` - Load Slot 2 to clipboard
- `Alt+3` - Load Slot 3 to clipboard

**Step 2:** Paste the content
- `Ctrl+V` - Paste (normal paste command)

**Example:** Press `Alt+1` then immediately press `Ctrl+V` to paste Slot 1 content.

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **Windows, macOS, or Linux**

### Step-by-Step Installation

1. **Open Terminal/Command Prompt** in the project folder:
   ```bash
   cd c:\Users\Deshan\Desktop\test\multi-copy-paste-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   *(This will download Electron and required packages - takes 1-2 minutes)*

3. **Run the app:**
   ```bash
   npm start
   ```

4. **First Launch:**
   - A window will open showing instructions
   - App icon appears in system tray (bottom-right on Windows)
   - Shortcuts are now active!

## 📖 How to Use (Beginner's Guide)

### Example Scenario:
You're working on a project and need to copy:
- Your email address
- A code snippet
- A URL

**Step 1: Copy to Slots**

