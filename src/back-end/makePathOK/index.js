const path = require('path');

const makePathOK = pathName => {
  const OKPath = path.resolve(
    __dirname.replace('webpack', '').replace('main', ''),
    '../../../',
    pathName
  );

  return OKPath;
}

module.exports = makePathOK;