const { app, ipcMain } = require('electron')
const fs = require('fs');
const connect = require('../src/connector/connect')
const ACTION_LISTENERS = require('../src/back-end/action-listeners');
const getCurrentWindow = require('../src/back-end/getCurrentWindow');

app.disableHardwareAcceleration();

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

app.on('ready', async() => {
  const window = getCurrentWindow();
  window.webContents.session.clearStorageData();
  connect(ipcMain)(ACTION_LISTENERS);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('render-process-gone', (event, { reason }) => {
  fs.writeFileSync('crash.txt', reason);
});
