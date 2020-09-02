const fs = require('fs');
const ACTIONS = require('../../../connector/actions');
const makePathOK = require('../../makePathOK');
const { CRC32Stream } = require('crc32-stream');

const getHashAsync = ({
  pathToFile,
  onFileSizeKnown = () => 0,
  onProgressChanged = () => 0,
}) => new Promise(resolve => {
  let readedSize = 0;
  const fileSize = fs.statSync(pathToFile).size;

  const progressChangedCheckInterval = setInterval(() => {
    onProgressChanged(readedSize);
  }, 500);

  onFileSizeKnown(fileSize);
  const stream = fs.createReadStream(pathToFile);
  const checksum = new CRC32Stream();
  stream.pipe(checksum);

  checksum.on('data', chunk => {
    readedSize += chunk.length;
  });
  checksum.on('end', () => {
    try {
      clearInterval(progressChangedCheckInterval);
      onProgressChanged(fileSize);
      resolve(checksum.hex());
    } catch (e) { }
  });
});

const getCurrentHashDictionary = async (event, serverHashList) => {
  event.sender.send(ACTIONS.GET_FILES_HASH, { action: 'started' });
  const fileList = Object.keys(serverHashList);
  let currentHashDictionary = { };
  let summaryFileSize = 0;
  const readedSizeMap = new Map();
  currentHashDictionary = { };
  await Promise.all(
    fileList.map(async file => {
      const hash = await getHashAsync({
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