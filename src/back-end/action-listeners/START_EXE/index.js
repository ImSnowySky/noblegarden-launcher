const run = require('child_process').spawn;
const { app } = require('electron');
const makePathOK = require('../../makePathOK');

module.exports = async () => {
  run(makePathOK('Wow.exe'), [], { detached: true });
  setTimeout(() => app.quit(), 5000);
};