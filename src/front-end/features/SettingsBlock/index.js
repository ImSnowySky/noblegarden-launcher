import React from 'react';
import ACTIONS from 'connector/actions';
import Dispatcher from 'connector/dispatcher';
import * as Elements from './elements';
import Patch from './components/Patch';

class SettingsBlock extends React.Component {
  state = {
    isOpened: false,
    isUpdating: false,
  };

  componentDidMount() {
    Dispatcher.on(ACTIONS.TOGGLE_SETTINGS, this.changeOpened);
    Dispatcher.on(ACTIONS.GET_SERVER_HASHLIST, this.onUpdateStart);
    Dispatcher.on(ACTIONS.DOWNLOAD_LIST_OF_FILES, (_, payload) => this.onUpdateFinished(payload));
  }

  onUpdateStart = () => {
    this.setState({
      isOpened: false,
      isUpdating: true,
    });
  }

  onUpdateFinished = ({ action }) => {
    action === 'finished' && this.setState({
      isUpdating: false
    })
  }

  changeOpened = () => {
    const { isUpdating, isOpened } = this.state;
    if (isUpdating && !isOpened) return false;
    this.setState({ isOpened: !isOpened });
  }

  render() {
    const { customPatches = [], settings = {}, watchPatch, unwatchPatch, changeDownloadThreads, resetCache } = this.props;
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
                <option value = "3">3</option>
              </select>
            </Elements.BlockRow>
            <Elements.BlockRow>
              {
                settings.downloadThreads === 3 && <Elements.OptDescription>
                  Повышает скорость скачивания, однако, может приводить к невозможности завершить загрузку до перезапуска
                </Elements.OptDescription>
              }
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
          <Elements.Block>
            <Elements.BlockTitle>Сохраненные данные</Elements.BlockTitle>
            <Elements.ResetButton onClick={() => resetCache()}>Сброс кэша</Elements.ResetButton>
          </Elements.Block>
        </Elements.Content>
      </Elements.Container>
    )
  }
}

export default SettingsBlock;