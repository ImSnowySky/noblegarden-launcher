const ACTIONS = require('../../../connector/actions');
const axios = require('axios');

const getLauncherVersion = async event => {
  event.sender.send(ACTIONS.CHECK_LAUNCHER_VERSION, { action: 'started' });
  try {
    const response = await axios.get('http://95.216.176.164/launcher-version.json');
    const { version } = response.data;
    event.sender.send(ACTIONS.CHECK_LAUNCHER_VERSION, { action: 'finished', result: version === '1.1.0' });
    return response.data;
  } catch (e) {
    event.sender.send(ACTIONS.CHECK_LAUNCHER_VERSION, { action: 'finished', result: 'not-working' });
  }
}

module.exports = getLauncherVersion;