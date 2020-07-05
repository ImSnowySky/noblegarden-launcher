const getCurrentWindow = require('../../../back-end/getCurrentWindow');

module.exports = () => {
  const window = getCurrentWindow();
  window.close();
};