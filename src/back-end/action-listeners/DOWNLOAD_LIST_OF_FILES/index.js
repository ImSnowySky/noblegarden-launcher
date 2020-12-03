const ACTIONS = require('../../../connector/actions');
const axios = require('axios');
const fs = require('fs');
const makePathOK = require('../../makePathOK');
const chunk = require('lodash/chunk')

const downloadSingleFile = async ({
  pathToFile,
  pathOnServer,
  onProgressChanged = () => 0,
}) => new Promise(async (resolve, reject) => {
  let downloadedSize = 0;
  let fullSize = 0;
  let lockPathToFile = `${pathToFile}.lock`;

  try {
    const req = await axios({
      method: 'get',
      url: pathOnServer,
      responseType: 'stream',
    });

    const progressChangedCheckInterval = setInterval(() => {
      fs.stat(lockPathToFile, (err, stat) => {
        if (!err && stat.size > downloadedSize) {
          downloadedSize = stat.size;
          onProgressChanged(downloadedSize);
        }
      })
    }, 500);

    const writeStream = fs.createWriteStream(lockPathToFile);
    writeStream.on('pipe', src => {
      fullSize = parseInt(src.headers['content-length']);
    });
    writeStream.on('error', err => {
      try {
        writer.close();
        clearInterval(progressChangedCheckInterval);
        onProgressChanged(0);
        reject(err);
      } catch (e) {
        return null;
      }
    });
    writeStream.on('close', () => {
      try {
        clearInterval(progressChangedCheckInterval);
        onProgressChanged(fullSize);
        resolve(true);
      } catch (e) {
        return null;
      }
    });

    req.data.pipe(writeStream);
  } catch (e) {
    console.log(`REFUSED ${pathOnServer}`)
  }
});

const deleteOldFile = pathToFile => {
  if (fs.existsSync(pathToFile)) {
    try {
      fs.unlinkSync(pathToFile);
    } catch(e) {
      console.log('Delete old file crash');
    };
  }
}

const makeNewFileNameCorrect = pathToFile => {
  try {
    fs.renameSync(`${pathToFile}.lock`, pathToFile);
  } catch(e) {
    console.log('Make new file name correct crash');
    console.log(e);
  };
}

const fakeDownload = name => new Promise(res => {
  setTimeout(() => {
    console.log(`${name} downloaded`);
    res();
  }, 200)
});

const downloadListOfFiles = async (event, listOfFiles, serverMeta, sizeToDownload, downloadThreads) => {
  event.sender.send(ACTIONS.DOWNLOAD_LIST_OF_FILES, { action: 'started' });
  if (listOfFiles.length > 0) {
    const chunkedList = chunk(listOfFiles, downloadThreads);
    const downloadedSizeMap = new Map();

    for (let i = 0; i < chunkedList.length; i++) {
      const currentChunk = chunkedList[i];
      console.log(`Chunk ${i} from ${chunkedList.length - 1} started`);

      await Promise.all(
        currentChunk.map(async fileName => {
          const pathToFile = makePathOK(fileName);
          //await fakeDownload(pathToFile);
          await downloadSingleFile({
            pathToFile,
            pathOnServer: serverMeta[fileName].path,
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
          deleteOldFile(pathToFile);
          makeNewFileNameCorrect(pathToFile);
        })
      );
      console.log('resolved');
    }
    console.log('all resolved');
  }
  event.sender.send(
    ACTIONS.DOWNLOAD_LIST_OF_FILES,
    {
      action: 'finished',
      progress: 100,
    }
  );

  return null;
}

module.exports = downloadListOfFiles;