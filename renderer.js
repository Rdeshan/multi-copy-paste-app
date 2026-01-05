const { ipcRenderer } = require('electron');

// Initialize slots display
function updateSlotDisplay(slotNumber, content) {
  const slotElement = document.getElementById(`slot${slotNumber}`);
  if (slotElement) {
    slotElement.textContent = content || '(empty)';
  }
}

// Clear specific slot
function clearSlot(slotNumber) {
  // This will be called from the UI
  // We need to communicate with main process
  // For now, just update UI - in production, you'd use IPC
  updateSlotDisplay(slotNumber, '');
}

// Listen for updates from main process
ipcRenderer.on('slots-updated', (event, slots) => {
  updateSlotDisplay(1, slots[1]);
  updateSlotDisplay(2, slots[2]);
  updateSlotDisplay(3, slots[3]);
});

// Initial load - request current slots
window.addEventListener('DOMContentLoaded', () => {
  console.log('Multi Copy Paste App Loaded!');
});
