const ACTIONS = require('../../../connector/actions');
const makePathOK = require('../../makePathOK');
const chunk = require('lodash/chunk')
const EasyDl = require("easydl");
const sudo = require('sudo-prompt');
const Store = require('electron-store');
const fs = require('fs');

const storage = new Store();
const rightModifiedDates = storage.store.rightModifiedDates ? { ...storage.store.rightModifiedDates } : {};

const downloadSingleFile = async ({
  pathToFile,
  pathOnServer,
  connectionsLimit = 1,
  onProgressChanged = () => 0,
}) => new Promise(async resolve => {
  const fileName = pathToFile.split('\\').reverse()[0];
  const directory = pathToFile.replace(`\\${fileName}`, '');

  const download = new EasyDl(pathOnServer, `${directory}/${fileName}.lock`, {
    connections: connectionsLimit,
    existBehavior: 'overwrite',
  });

  download.on('progress', ({ total }) => onProgressChanged(total.bytes || 0));

  try {
    await download.wait();
    resolve();
  } catch (e) {
    console.log(`${fileName} REFUSED`);
  }
});

const downloadListOfFiles = async (event, listOfFiles, serverMeta, sizeToDownload, downloadThreads) => {
  event.sender.send(ACTIONS.DOWNLOAD_LIST_OF_FILES, { action: 'started' });
  let pathForUpdateCMD = [];

  if (listOfFiles.length > 0) {
    const chunkedList = chunk(listOfFiles, downloadThreads);
    const downloadedSizeMap = new Map();

    for (let i = 0; i < chunkedList.length; i++) {
      const currentChunk = chunkedList[i];
      console.log(`Chunk ${i} from ${chunkedList.length - 1} started`);

      await Promise.all(
        currentChunk.map(async fileName => {
          const pathToFile = makePathOK(fileName);
          pathForUpdateCMD.push(fileName);
          await downloadSingleFile({
            pathToFile,
            pathOnServer: serverMeta[fileName].path,
            connectionsLimit: downloadThreads,
            onProgressChanged: currentFileSize => {
              let summaryDownloadedSize = 0;
              downloadedSizeMap.set(fileName, currentFileSize);
              downloadedSizeMap.forEach(size => summaryDownloadedSize += size);
              event.sender.send(ACTIONS.DOWNLOAD_LIST_OF_FILES, {
                action: 'ongoing',
                progress: (summaryDownloadedSize / sizeToDownload).toFixed(5) * 100,
                absoluteProgress: {
                  current: (summaryDownloadedSize / 1024 / 1024).toFixed(2),
                  end: (sizeToDownload / 1024 / 1024).toFixed(2),
                },
              });
            },
          });
        })
      );
      console.log('resolved');
    }
    console.log('all resolved');
  }

  if (pathForUpdateCMD.length <= 0) {
    event.sender.send(
      ACTIONS.DOWNLOAD_LIST_OF_FILES,
      {
        action: 'finished',
        progress: 100,
      }
    );

    return null;
  }

  const cmdForUpdate = pathForUpdateCMD.map(path => {
    path = makePathOK(path);
    const fileName = path.split('\\').reverse()[0];
    const currentCommand = `IF EXIST "${path}.lock" ( IF EXIST "${path}" del "${path}" ) && IF EXIST "${path}.lock" rename "${path}.lock" ${fileName}`;  
    return currentCommand;
  }).filter(cmd => cmd !== '').join(' && ');

  sudo.exec(cmdForUpdate, { name: 'Noblegarden Launcher ' }, err => {
    if (err) {
      let currentPath = null;

      try {
        pathForUpdateCMD.forEach(path => {
          currentPath = makePathOK(path);
          if (currentPath.includes('I')) {
            throw Error();
          }
          fs.existsSync(path) && fs.unlinkSync(path);
          !fs.existsSync(path) && fs.renameSync(`${path}.lock`, path);
        });
      } catch (e) {
        event.sender.send(
          ACTIONS.DOWNLOAD_LIST_OF_FILES,
          {
            action: 'error',
            progress: 100,
            badFile: currentPath,
          }
        );

        return null;
      }
    }

    event.sender.send(
      ACTIONS.DOWNLOAD_LIST_OF_FILES,
      {
        action: 'finished',
        progress: 100,
      }
    );
  });

  pathForUpdateCMD.forEach(path => {
    try {
      if (!fs.existsSync(makePathOK(path))) return;

      const { mtime: modifiedTime, size } = fs.statSync(makePathOK(path));
      rightModifiedDates[path] = {
        time: modifiedTime,
        hash: serverMeta[path]['crc32-hash'],
        size: size,
      }
    } catch (e) {}
  })

  storage.set('rightModifiedDates', rightModifiedDates);
  return null;
}

module.exports = downloadListOfFiles;