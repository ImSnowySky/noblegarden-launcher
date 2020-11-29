const ACTIONS = require('../../../connector/actions');
const Store = require('electron-store');
const store = new Store();

const getStorage = async event => {
  event.sender.send(ACTIONS.GET_STORAGE, { action: 'finished', result: store.store });
  return store.store;
}

module.exports = getStorage;