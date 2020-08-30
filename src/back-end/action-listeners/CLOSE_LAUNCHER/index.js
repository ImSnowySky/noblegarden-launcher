const getCurrentWindow = require('../../getCurrentWindow');

module.exports = () => {
  const window = getCurrentWindow();
  window.close();
};