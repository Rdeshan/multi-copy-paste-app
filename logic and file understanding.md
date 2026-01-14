How Each File Works in Your Multi-Copy-Paste App
main.js - Backend/Main Process (Core Logic)
The brain of your Electron app that runs in Node.js:

Window Management: Creates the main window (400x500px) that shows your UI
Clipboard Storage: Maintains 3 slots in memory to store copied text
Global Shortcuts: Registers system-wide keyboard shortcuts:
Ctrl+C+1/2/3 → Copies current clipboard content to respective slot
Alt+1/2/3 → Loads slot content to clipboard for pasting
System Tray: Creates a tray icon with a menu showing all slots and options
Notifications: Shows desktop notifications when copying/pasting
Lifecycle: Keeps app running in tray even when window is closed
index.html - UI Structure
The visual interface users see:

Header: Title and description
Instructions: Shows how to use copy (Ctrl+C+1/2/3) and paste (Alt+1/2/3) shortcuts
Slot Display: 3 cards showing current content in each clipboard slot
Clear Buttons: Allows clearing individual slots
Embedded Styles: Beautiful gradient background, card layout, and responsive design
Links to renderer.js for interactivity
renderer.js - Frontend Logic
Handles UI updates and user interactions:

Display Updates: Updates slot content when copied via updateSlotDisplay()
Clear Function: Handles clearing slots from UI buttons
IPC Listening: Listens for slots-updated events from main process
Initialization: Logs when app loads successfully
preload.js - Security Bridge
Safely exposes limited Node.js functionality to the renderer:

Context Bridge: Creates a secure API (clipboardAPI) accessible from the web page
Clipboard Access: Provides readText() and writeText() methods
Security: Prevents renderer from accessing all of Node.js directly
package.json - Project Configuration
Defines your app's metadata and dependencies:

Entry Point: main.js as the app's starting file
Scripts: npm start runs Electron
Dependencies: Requires Electron framework
styles.css - External Styling (Currently Unused)
Contains additional CSS styles, but index.html has embedded <style> tags instead, so this file isn't currently loaded.

How They Work Together:
Startup: package.json → main.js → creates window loading index.html
User copies: Press Ctrl+C+1 → main.js detects → stores in slot → sends update to renderer.js → UI refreshes
User pastes: Press Alt+1 → main.js loads slot to system clipboard → user presses Ctrl+V to paste
UI interaction: Click "Clear" button → renderer.js handles → communicates with main.js → updates storage
