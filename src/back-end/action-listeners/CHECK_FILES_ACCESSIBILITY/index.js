const ACTIONS = require('../../../connector/actions');
const makePathOK = require('../../makePathOK');
const fs = require('fs');

const checkFilesAccessibility = async (event, filesToCheck = []) => {
  event.sender.send(ACTIONS.CHECK_FILES_ACCESSIBILITY, { action: 'started', result: false });
  let currentFile = null;

  try {
    filesToCheck.forEach(file => {
      const filePath = makePathOK(file);
      currentFile = filePath;

      if (fs.existsSync(filePath)) {
        console.log(`${filePath} exists`);
        if (!fs.accessSync(filePath, fs.constants.R_OK | fs.constants.W_OK)) {
          throw Error();
        }
      }
    });
  } catch (e) {
    event.sender.send(ACTIONS.CHECK_FILES_ACCESSIBILITY, { action: 'finished', result: currentFile });
    return false;
  }

  event.sender.send(ACTIONS.CHECK_FILES_ACCESSIBILITY, { action: 'finished', result: false });
  return true;
}

module.exports = checkFilesAccessibility;