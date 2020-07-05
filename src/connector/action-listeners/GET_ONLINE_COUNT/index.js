const ACTIONS = require('../../actions');
const axios = require('axios');

const getOnlineCount = async event => {
  event.sender.send(ACTIONS.GET_ONLINE_COUNT, { action: 'started' });

  const response = await axios.get('http://noblegarden.net/armory/online');
  const count = parseInt(response.data, 10);

  event.sender.send(ACTIONS.GET_ONLINE_COUNT, { action: 'finished', result: count });

  return count;
}

module.exports = getOnlineCount;