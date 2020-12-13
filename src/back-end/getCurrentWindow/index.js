const { app, BrowserWindow } = require('electron');
const makePathOK = require('../makePathOK');
const fs = require('fs');

let win = null;

const removeAllTrashedFiles = (dir) => {
  const files = fs.readdirSync(dir, ({ withFileTypes: true }));
  const filesToDelete = files.filter(({ name }) => name.match(/\.lock\.\$\$.*/));

  filesToDelete.forEach(({ name }) => 
    fs.unlinkSync(`${dir}/${name}`)
  );
}

const getCurrentWindow = () => {
  if (!win) {
    win = new BrowserWindow({
      width: 900,
      height: 600,
      title: 'Noblegarden Launcher',
      show: false,
      frame: false,
      resizable: false,
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
      try {
        removeAllTrashedFiles(makePathOK('Data/ruRU'));
      } catch (e) {};

      if (process.platform !== 'darwin') app.quit();
      win = null
    });
  }

  return win;
}

module.exports = getCurrentWindow;