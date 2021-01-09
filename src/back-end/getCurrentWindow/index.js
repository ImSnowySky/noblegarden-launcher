const { app, BrowserWindow } = require('electron');
const makePathOK = require('../makePathOK');
const fs = require('fs');

let win = null;

const removeAllTrashedFiles = (dir) => {
  const files = fs.readdirSync(dir, ({ withFileTypes: true }));
  const filesToDelete = files.filter(({ name }) => name.match(/\.lock\..*/));

  filesToDelete.forEach(({ name }) => 
    fs.unlinkSync(`${dir}/${name}`)
  );
}

const renameAllDownloadedButNotRenamedFiles = dir => {
  const files = fs.readdirSync(dir, ({ withFileTypes: true }));
  const filesToRename = files.filter(({ name }) => name.match(/\.lock$/));

  filesToRename.forEach(({ name }) => {
    console.log(name);
    const nameWithoutLock = name.replace(/\.lock/g, '');
    console.log(nameWithoutLock);
    if (fs.existsSync(`${dir}/${nameWithoutLock}`)) {
      fs.unlinkSync(`${dir}/${nameWithoutLock}`)
    };

    fs.renameSync(`${dir}/${name}`, `${dir}/${nameWithoutLock}`);
  });
}

const getCurrentWindow = () => {
  if (!win) {
    try {
      removeAllTrashedFiles(makePathOK('Data/ruRU'));
      removeAllTrashedFiles(makePathOK('Data'));
      renameAllDownloadedButNotRenamedFiles(makePathOK('Data/ruRU'));
      renameAllDownloadedButNotRenamedFiles(makePathOK('Data'));
    } catch (e) {};

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
        removeAllTrashedFiles(makePathOK('Data'));
        renameAllDownloadedButNotRenamedFiles(makePathOK('Data/ruRU'));
        renameAllDownloadedButNotRenamedFiles(makePathOK('Data'));
      } catch (e) {};

      if (process.platform !== 'darwin') app.quit();
      win = null
    });
  }

  return win;
}

module.exports = getCurrentWindow;