import React from 'react';
import ACTIONS from 'connector/actions';
import Dispatcher from 'connector/dispatcher';
import * as Elements from './elements';

class SettingsBlock extends React.Component {
  state = {
    isOpened: false,
    customPatches: [],
    settings: {
      downloadThreads: 4,
    },
  };

  componentDidMount() {
    Dispatcher.dispatch(ACTIONS.GET_STORAGE);
    Dispatcher.on(ACTIONS.TOGGLE_SETTINGS, this.changeOpened);
    Dispatcher.on(ACTIONS.GET_CUSTOM_PATCHES, (_, payload) => this.onGetCustomPatches(payload));
    Dispatcher.on(ACTIONS.GET_STORAGE, (_, payload) => this.onStorageGet(payload));
  }

  changeOpened = () => {
    this.setState({ isOpened: !this.state.isOpened });
  }

  onStorageGet = ({ result }) => {
    if (!result) result = {};

    result = {
      downloadThreads: result.downloadThreads || 4,
    };

    this.setState({ settings: result }, () => {
      console.log(this.state.settings)
    });
  }

  onGetCustomPatches = ({ result = [] }) => {
    this.setState({ customPatches: result });
  }

  onDownloadThreadsChange = e => {
    if (!e || !e.target || !e.target.value) return null;
    Dispatcher.dispatch(ACTIONS.SAVE_TO_STORAGE, { key: 'downloadThreads', value: +e.target.value });

    this.setState({
      settings: {
        downloadThreads: +e.target.value,
      }
    });
  }

  render() {
    const { isOpened = false, settings } = this.state;

    return (
      <Elements.Container isOpened = {isOpened}>
        <Elements.Title>Настройки</Elements.Title>
        <Elements.Content>
          <Elements.Block>
            <Elements.BlockTitle>Загрузка</Elements.BlockTitle>
            <Elements.BlockRow>
              <label htmlFor = "download-threads">Потоков загрузки</label>
              <select name = "download-threads" onChange={this.onDownloadThreadsChange} value={settings.downloadThreads}>
                <option value = "1">1</option>
                <option value = "2">2</option>
                <option value = "4">4</option>
              </select>
            </Elements.BlockRow>
          </Elements.Block>
          <Elements.Block>
            <Elements.BlockTitle>Необязательные патчи</Elements.BlockTitle>
          </Elements.Block>
        </Elements.Content>
      </Elements.Container>
    )
  }
}

export default SettingsBlock;