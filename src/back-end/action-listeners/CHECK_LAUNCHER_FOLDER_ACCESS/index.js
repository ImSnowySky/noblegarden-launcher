const ACTIONS = require('../../../connector/actions');
const makePathOK = require('../../makePathOK');
const fs = require('fs');

const getLauncherVersion = async event => {
  event.sender.send(ACTIONS.CHECK_LAUNCHER_FOLDER_ACCESS, { action: 'started', result: null });
  
  try {
    fs.accessSync(makePathOK('/'), fs.constants.R_OK | fs.constants.W_OK);
  } catch (err) {
    event.sender.send(ACTIONS.CHECK_LAUNCHER_FOLDER_ACCESS, { action: 'finished', result: makePathOK('/') });
    return false;
  }
  
  try {
    fs.accessSync(makePathOK('Data'), fs.constants.R_OK | fs.constants.W_OK);
  } catch (err) {
    event.sender.send(ACTIONS.CHECK_LAUNCHER_FOLDER_ACCESS, { action: 'finished', result: makePathOK('Data') });
    return false;
  }
  
  try {
    fs.accessSync(makePathOK('Data/ruRU'), fs.constants.R_OK | fs.constants.W_OK);
  } catch (err) {
    event.sender.send(ACTIONS.CHECK_LAUNCHER_FOLDER_ACCESS, { action: 'finished', result: makePathOK('Data/ruRU') });
    return false;
  }

  event.sender.send(ACTIONS.CHECK_LAUNCHER_FOLDER_ACCESS, { action: 'finished', result: null });
  return true;
}

module.exports = getLauncherVersion;