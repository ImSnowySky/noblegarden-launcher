const ACTIONS = require('../../../connector/actions');

const getListOfChangedFiles = async (event, lists) => {
  const { serverList, clientList } = lists;
  event.sender.send(ACTIONS.GET_LIST_OF_CHANGED_FILES, { action: 'started' });

  const sizeOfList = Object.keys(serverList).length;
  let count = 0;
  const listOfChangedFiles = Object.keys(serverList).map(fileName => {
    const serverPathInfo = serverList[fileName];
    const clientHash = clientList[fileName];
    if (serverPathInfo.hash !== clientHash) {
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