import React from 'react';
import ACTIONS from 'connector/actions';
import Dispatcher from 'connector/dispatcher';
import * as Elements from './elements';

class SettingsBlock extends React.Component {
  state = {
    isOpened: false,
    customPatches: [],
    downloadThreads: 4,
  };

  componentDidMount() {
    Dispatcher.on(ACTIONS.TOGGLE_SETTINGS, this.changeOpened);
    Dispatcher.on(ACTIONS.GET_CUSTOM_PATCHES, (_, payload) => this.onGetCustomPatches(payload));
  }

  changeOpened = () => {
    this.setState({ isOpened: !this.state.isOpened });
  }

  onGetCustomPatches = ({ result = [] }) => {
    this.setState({ customPatches: result });
  }

  onDownloadThreadsChange = e => {
    if (!e || !e.target || !e.target.value) return null;

    this.setState({ downloadThreads: +e.target.value });
    console.log(+e.target.value);
  }

  render() {
    const { isOpened = false, downloadThreads } = this.state;

    return (
      <Elements.Container isOpened = {isOpened}>
        <Elements.Title>Настройки</Elements.Title>
        <Elements.Content>
          <Elements.Block>
            <Elements.BlockTitle>Загрузка</Elements.BlockTitle>
            <Elements.BlockRow>
              <label htmlFor = "download-threads">Потоков загрузки</label>
              <select name = "download-threads" onChange={this.onDownloadThreadsChange} defaultValue={downloadThreads}>
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