const ACTIONS = require('../../actions');
const axios = require('axios');
const fs = require('fs');
const makePathOK = require('../../../back-end/makePathOK');

const downloadSingleFile = async (pathToFile, pathOnServer) => {
  const writeStream = fs.createWriteStream(`${pathToFile}.lock`);

  const response = await axios({
    method: 'get',
    url: pathOnServer,
    responseType: 'stream',
  });

  return new Promise((resolve, reject) => {
    response.data.pipe(writeStream);
    let error = null;
    writeStream.on('error', err => {
      error = err;
      writer.close();
      reject(err);
    });
    writeStream.on('close', () => {
      if (!error) {
        resolve(true);
      }
    });
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
  const sizeOfList = listOfFiles.length;
  let count = 0;

  await Promise.all(
    listOfFiles.map(async fileName => {
      const pathToFile = makePathOK(fileName);
      try {
        await downloadSingleFile(pathToFile, serverMeta[fileName].path);
        await deleteOldFile(pathToFile);
        await makeNewFileNameCorrect(pathToFile);

        count += 1;
        event.sender.send(
          ACTIONS.DOWNLOAD_LIST_OF_FILES,
          {
            action: 'ongoing',
            progress: (count / sizeOfList).toFixed(2) * 100,
          }
        );
      } catch (e) {
        console.log(`Error in ${pathToFile}: ${e}`);
      }
    })
  );

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