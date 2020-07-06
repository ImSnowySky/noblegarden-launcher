const path = require('path');

const makePathOK = pathName => path.join(__dirname, '/../../../../../', pathName);

module.exports = makePathOK;