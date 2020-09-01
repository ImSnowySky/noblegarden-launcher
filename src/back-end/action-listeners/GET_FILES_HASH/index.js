const fs = require('fs');
const ACTIONS = require('../../../connector/actions');
const { crc32 } = require('crc');
const makePathOK = require('../../makePathOK');

const readFileAsync = ({
  pathToFile,
  onFileSizeKnown = () => 0,
  onProgressChanged = () => 0,
}) => new Promise(resolve => {
  const chunks = [];
  let readedSize = 0;
  const stream = fs.createReadStream(pathToFile);
  const fileSize = fs.statSync(pathToFile).size;

  const progressChangedCheckInterval = setInterval(() => {
    onProgressChanged(readedSize);
  }, 500);

  onFileSizeKnown(fileSize);
  stream.on('data', chunk => {
    readedSize += chunk.length;
    chunks.push(chunk);
  });
  stream.on('error', () => {
    try {
      clearInterval(progressChangedCheckInterval);
      onProgressChanged(0);
      stream.destroy();
    } catch(e) {
      return null;
    }
  })
  stream.on('end', () => {
    try {
      clearInterval(progressChangedCheckInterval);
      onProgressChanged(fileSize);
      stream.destroy();
      resolve(Buffer.concat(chunks));
    } catch(e) {
      return null;
    }
  });
})

const getSingleFileHash = async ({ pathToFile, onFileSizeKnown, onProgressChanged }) => {
  try {
    const file = await readFileAsync({ pathToFile, onFileSizeKnown, onProgressChanged });
    const hash = await crc32(file).toString(16).toUpperCase();
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
    let summaryFileSize = 0;
    const readedSizeMap = new Map();
    currentHashDictionary = { };
    await Promise.all(
      fileList.map(async file => {
        const hash = await getSingleFileHash({
          pathToFile: makePathOK(file),
          onFileSizeKnown: size => summaryFileSize += size,
          onProgressChanged: readedSize => {
            let summaryReadedSize = 0;
            readedSizeMap.set(file, readedSize);
            readedSizeMap.forEach(size => summaryReadedSize += size);

            const progress = (summaryReadedSize / summaryFileSize).toFixed(2) * 100;
            event.sender.send(ACTIONS.GET_FILES_HASH, {
              action: 'ongoing',
              progress,
              absoluteProgress: {
                current: (summaryReadedSize / 1024 / 1024).toFixed(2),
                end: (summaryFileSize / 1024 / 1024).toFixed(2),
              },
            });
          }
        });
        currentHashDictionary[file] = hash;
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