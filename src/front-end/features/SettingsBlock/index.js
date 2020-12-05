import React from 'react';
import ACTIONS from 'connector/actions';
import Dispatcher from 'connector/dispatcher';
import * as Elements from './elements';
import Patch from './components/Patch';

class SettingsBlock extends React.Component {
  state = {
    isOpened: false,
  };

  componentDidMount() {
    Dispatcher.on(ACTIONS.TOGGLE_SETTINGS, this.changeOpened);
  }

  changeOpened = () => {
    this.setState({ isOpened: !this.state.isOpened });
  }

  render() {
    const { customPatches = [], settings = {}, watchPatch, unwatchPatch, changeDownloadThreads } = this.props;
    const { isOpened = false } = this.state;
  
    const patches = Object.keys(customPatches).map(patchName => ({
      path: patchName,
      name: patchName.split('/').reverse()[0],
      description: customPatches[patchName].description,
    }));

    return (
      <Elements.Container isOpened = {isOpened}>
        <Elements.Title>Настройки</Elements.Title>
        <Elements.Content>
          <Elements.Block>
            <Elements.BlockTitle>Загрузка</Elements.BlockTitle>
            <Elements.BlockRow>
              <label htmlFor = "download-threads">Потоков загрузки</label>
              <select name = "download-threads" onChange={e => changeDownloadThreads(+e.target.value)} value={settings.downloadThreads}>
                <option value = "1">1</option>
                <option value = "2">2</option>
                <option value = "4">4</option>
              </select>
            </Elements.BlockRow>
          </Elements.Block>
          <Elements.Block>
            <Elements.BlockTitle>Необязательные патчи</Elements.BlockTitle>
            { patches.map((patch, i) =>
                <Patch {...patch} key = {i}
                  watchedCustomPatches = {settings.watchedCustomPatches}
                  watchPatch = {watchPatch}
                  unwatchPatch = {unwatchPatch}
                />
            )}
          </Elements.Block>
        </Elements.Content>
      </Elements.Container>
    )
  }
}

export default SettingsBlock;