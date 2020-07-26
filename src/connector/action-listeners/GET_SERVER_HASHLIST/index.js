const ACTIONS = require('../../actions');
const axios = require('axios');

let currentServerDictionary = null;

const getServerHashDictionary = async event => {
  event.sender.send(ACTIONS.GET_SERVER_HASHLIST, { action: 'started' });

  if (!currentServerDictionary) {
    const serverAddress = await axios.get('http://noblegarden.net/site/patches-ip').then(res => res.data);
    const serverJSON = await axios.get(`http://${serverAddress}/patches.json`, {
      onUploadProgress: progressEvent => {
        progressEvent.lengthComputable && event.sender.send(
          ACTIONS.GET_SERVER_HASHLIST,
          {
            action: 'ongoing',
            progress: (progressEvent.loaded / progressEvent.total).toFixed(2) * 100
          }
        )
      }
    });

    currentServerDictionary = serverJSON.data;
  }

  event.sender.send(
    ACTIONS.GET_SERVER_HASHLIST,
    {
      action: 'finished',
      progress: 100,
      result: currentServerDictionary,
    }
  );

  return currentServerDictionary;
}

module.exports = getServerHashDictionary;