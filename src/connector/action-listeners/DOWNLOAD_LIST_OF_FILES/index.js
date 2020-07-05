const ACTIONS = require('../../actions');
const axios = require('axios');
const fs = require('fs');

const downloadSingleFile = async (fileName, filePath) => {
  const writeStream = fs.createWriteStream(`${fileName}.lock`);

  const response = await axios({
    method: 'get',
    url: filePath,
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

const deleteOldFile = fileName => new Promise(
  (resolve, reject) => {
    fs.unlink(fileName, err => {
      if (err) reject (err);
      resolve(true);
    })
  }
);

const makeNewFileNameCorrect = fileName => new Promise(
  (resolve, reject) => {
    fs.rename(`${fileName}.lock`, `${fileName}`, err => {
      if (err) reject(err);
      resolve(true);
    })
  }
)

const downloadListOfFiles = async (event, listOfFiles, serverMeta) => {
  event.sender.send(ACTIONS.DOWNLOAD_LIST_OF_FILES, { action: 'started' });
  const sizeOfList = listOfFiles.length;
  let count = 0;

  await Promise.all([
    listOfFiles.map(async fileName => {
      try {
        await downloadSingleFile(fileName, serverMeta[fileName].path);
        await deleteOldFile(fileName);
        await makeNewFileNameCorrect(fileName);

        count += 1;
        event.sender.send(
          ACTIONS.DOWNLOAD_LIST_OF_FILES,
          {
            action: 'ongoing',
            progress: (count / sizeOfList).toFixed(2) * 100,
          }
        );
      } catch (e) {
        console.log(`Error in ${fileName}: ${e}`);
      }
    })
  ])

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