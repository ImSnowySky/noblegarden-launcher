const ACTIONS = require('../../../connector/actions');

const toggleSettings = async (event) =>
  event.sender.send(ACTIONS.TOGGLE_SETTINGS, { action: 'toggle-header' })

module.exports = toggleSettings;