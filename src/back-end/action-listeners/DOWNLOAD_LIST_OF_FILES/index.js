const ACTIONS = require('../../../connector/actions');
const axios = require('axios');
const fs = require('fs');
const makePathOK = require('../../makePathOK');

const downloadSingleFile = async ({ pathToFile, pathOnServer, onFileSizeKnown = () => null, onFileProgress = () => null }) => {
  let file = {
    checkInterval: -1,
    downloadedSize: 0,
    fullSize: 0,
  };
  let lockPathToFile = `${pathToFile}.lock`;
  const writeStream = fs.createWriteStream(lockPathToFile);

  const req = await axios({
    method: 'get',
    url: pathOnServer,
    responseType: 'stream',
  });

  const registerNextNotify = (delay = 1000) => {
    setTimeout(() => {
      fs.stat(lockPathToFile, (err, stat) => {
        if (!err) file.downloadedSize = stat.size;
        onFileProgress(file.downloadedSize);
        if (!err && file.downloadedSize < file.fullSize) registerNextNotify(delay);
        else onFileProgress(file.fullSize);
      })
    }, delay);
  }

  return new Promise((resolve, reject) => {
    let error = null;
    writeStream.on('pipe', src => {
      file.fullSize = parseInt(src.headers['content-length']);
      onFileSizeKnown(file.fullSize);
      registerNextNotify(5000);
    })
    writeStream.on('error', err => {
      error = err;
      writer.close();
      clearInterval(file.checkInterval);
      reject(err);
    });
    writeStream.on('close', () => {
      if (!error) {
        clearInterval(file.checkInterval);
        resolve(true);
      }
    });
    
    req.data.pipe(writeStream);
  });
}

const deleteOldFile = pathToFile => new Promise(
  (resolve, reject) => {
    fs.unlink(pathToFile, err => {
      if (err) reject (err);
      resolve(true);
    })
  }
);

const makeNewFileNameCorrect = pathToFile => new Promise(
  (resolve, reject) => {
    fs.rename(`${pathToFile}.lock`, `${pathToFile}`, err => {
      if (err) reject(err);
      resolve(true);
    })
  }
)

const downloadListOfFiles = async (event, listOfFiles, serverMeta) => {
  event.sender.send(ACTIONS.DOWNLOAD_LIST_OF_FILES, { action: 'started' });
  let summaryFilesSize = 0;
  let currentFileSizes = Array(listOfFiles.length);
  for (let i = 0; i < currentFileSizes.length; i++) {
    currentFileSizes[i] = 0;
  }

  await Promise.all(
    listOfFiles.map(async (fileName, fileIndex) => {
      const pathToFile = makePathOK(fileName);
      try {
        await downloadSingleFile({
          pathToFile,
          pathOnServer: serverMeta[fileName].path,
          onFileSizeKnown: expectedFileSize => summaryFilesSize += expectedFileSize,
          onFileProgress: currentFileSize => {
            currentFileSizes[fileIndex] = currentFileSize;
            summaryDownloadSize = currentFileSizes.reduce((val, accum = 0) => accum += val);
            try {
              event.sender.send(
                ACTIONS.DOWNLOAD_LIST_OF_FILES,
                {
                  action: 'ongoing',
                  progress: (summaryDownloadSize / summaryFilesSize).toFixed(5) * 100,
                }
              );
            } catch (e) {}

            if (summaryDownloadSize >= summaryFilesSize) {
              event.sender.send(
                ACTIONS.DOWNLOAD_LIST_OF_FILES,
                {
                  action: 'finished',
                  progress: 100,
                }
              );
            }
          }
        });
        if (fs.existsSync(pathToFile)) {
          await deleteOldFile(pathToFile);
        }
        await makeNewFileNameCorrect(pathToFile);       
      } catch (e) {
        console.log(`Error in ${pathToFile}: ${e}`);
      }
    })
  );

  return null;
}

module.exports = downloadListOfFiles;