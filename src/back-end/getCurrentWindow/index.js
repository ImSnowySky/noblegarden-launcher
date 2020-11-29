const { app, BrowserWindow } = require('electron');

let win = null;

const getCurrentWindow = () => {
  if (!win) {
    win = new BrowserWindow({
      width: 900,
      height: 600,
      title: 'Noblegarden Launcher',
      show: false,
      frame: false,
      resizable: true,
      webPreferences: {
        nodeIntegration: true,
      },
    });

    win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    win.webContents.on('did-finish-load', () => {
      win.show()
      win.focus()
    });

    win.on('closed', function () {
      if (process.platform !== 'darwin') app.quit();
      win = null
    });
  }

  return win;
}

module.exports = getCurrentWindow;