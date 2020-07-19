const ACTIONS = require('../../actions');
const axios = require('axios');

const getVKLink = async event => {
  event.sender.send(ACTIONS.GET_VK_LINK, { action: 'started' });
  try {
    const response = await axios.get('http://noblegarden.net/site/vk-link');
    event.sender.send(ACTIONS.GET_VK_LINK, { action: 'finished', result: response.data });
    return response.data;
  } catch (e) {
    return null;
  }
}

module.exports = getVKLink;