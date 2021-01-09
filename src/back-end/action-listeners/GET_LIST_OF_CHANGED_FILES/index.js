const ACTIONS = require('../../../connector/actions');
const Store = require('electron-store');
const makePathOK = require('../../makePathOK');
const fs = require('fs');

const storage = new Store();
const rightModifiedDates = {};

const updateCacheOnUnchangedFile = (fileName, clientHash) => {
  const filePath = makePathOK(fileName);
  try {
    if (fs.existsSync(filePath)) {
      const { mtime: modifiedTime, size } = fs.statSync(filePath);
      const fileCache = {
        time: new Date(modifiedTime).toISOString(),
        hash: clientHash,
        size,
      };

      rightModifiedDates[filePath] = fileCache
    }
  } catch (e) {}
}

const getListOfChangedFiles = async (event, lists) => {
  const { serverList, clientList } = lists;
  event.sender.send(ACTIONS.GET_LIST_OF_CHANGED_FILES, { action: 'started' });

  const sizeOfList = Object.keys(serverList).length;
  let count = 0;
  const listOfChangedFiles = Object.keys(serverList).map(fileName => {
    const serverPathInfo = serverList[fileName];
    const clientHash = clientList[fileName];
    if (serverPathInfo['crc32-hash'] === clientHash) {
      updateCacheOnUnchangedFile(fileName, clientHash);
    }
    else {
      count++;
      event.sender.send(
        ACTIONS.GET_LIST_OF_CHANGED_FILES,
        {
          action: 'ongoing',
          progress: (count / sizeOfList).toFixed(2) * 100,
        }
      );
      return fileName;
    }
  }).filter(name => name);

  storage.set('rightModifiedDates', rightModifiedDates);

  event.sender.send(
    ACTIONS.GET_LIST_OF_CHANGED_FILES,
    {
      action: 'finished',
      progress: 100,
      result: listOfChangedFiles
    }
  );

  return listOfChangedFiles;
}

module.exports = getListOfChangedFiles;