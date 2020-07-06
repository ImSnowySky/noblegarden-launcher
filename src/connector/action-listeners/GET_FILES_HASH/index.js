const ACTIONS = require('../../actions');
const md5File = require('md5-file');
const makePathOK = require('../../../back-end/makePathOK');

const getSingleFileHash = async pathToFile => {
  try {
    const hash = await md5File(pathToFile);
    return hash;
  }
  catch (e) {
    return null;
  }
};

let currentHashDictionary = null;

const getCurrentHashDictionary = async (event, serverHashList) => {
  event.sender.send(ACTIONS.GET_FILES_HASH, { action: 'started' });
  const fileList = Object.keys(serverHashList);

  if (!currentHashDictionary) {
    const fullCountOfFiles = fileList.length;
    currentHashDictionary = { };
    await Promise.all(
      fileList.map(async file => {
        if (file !== 'Data/ruRU/patch-ruRU-C.mpq') {
          const hash = await getSingleFileHash(makePathOK(file));
          currentHashDictionary[file] = hash;
        } else currentHashDictionary[file] = 'd84e27fbfff77fa06ff3b99c9c32a415';
        const alreadyCalculatedFiles = Object.keys(currentHashDictionary).length;
        const progress = (alreadyCalculatedFiles / fullCountOfFiles).toFixed(2) * 100;
        event.sender.send(ACTIONS.GET_FILES_HASH, { action: 'ongoing', progress });
      })
    );
  }

  event.sender.send(
    ACTIONS.GET_FILES_HASH,
    {
      action: 'finished',
      progress: 100,
      result: currentHashDictionary,
    },
  );

  return currentHashDictionary;
}

module.exports = getCurrentHashDictionary;