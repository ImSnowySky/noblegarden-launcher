const { app, ipcMain } = require('electron')
const connect = require('../src/connector/connect')
const ACTION_LISTENERS = require('../src/connector/action-listeners');
const getCurrentWindow = require('../src/back-end/getCurrentWindow');

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

app.on('ready', async() => {
  getCurrentWindow();
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
