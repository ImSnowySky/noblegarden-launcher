import ACTIONS from 'connector/actions';
import { ipcRenderer } from 'electron';

class Dispatcher {
  dispatch(action, ...payload) {
    if (!Object.keys(ACTIONS).map(key => ACTIONS[key]).includes(action)) {
      console.warn('No action inited');
      return false;
    }

    ipcRenderer.send(action, ...payload);
  }

  on (action, callback) {
    ipcRenderer.on(action, (event, ...arg) => callback(event, ...arg));
  }
};

const disp = new Dispatcher();

export default disp;