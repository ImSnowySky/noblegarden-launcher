const { shell } = require('electron');

module.exports = (_, URL) => shell.openExternal(URL);