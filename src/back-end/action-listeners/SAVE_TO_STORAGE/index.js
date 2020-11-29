const Store = require('electron-store');
const store = new Store();

const saveToStore = async (_, { key, value }) => store.set(key, value);

module.exports = saveToStore;