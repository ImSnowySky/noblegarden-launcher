import React from 'react';
import ACTIONS from 'connector/actions';
import Dispatcher from 'connector/dispatcher';
import * as Elements from './elements';
import ProgressBar from './components/ProgressBar';
import UpdateButton from './components/UpdateButton';
import StartButton from './components/StartButton';

const TEXT_FOR_ACTION_STEPS = {
  GET_SERVER_HASHLIST: {
    started: 'Получаем контрольные суммы',
    ongoing: 'Поулчаем контрольные суммы',
    finished: null,
  },
  GET_FILES_HASH: {
    started: 'Считаем чек-сумму',
    ongoing: 'Считаем чек-сумму',
    finished: null,
  },
  GET_LIST_OF_CHANGED_FILES: {
    started: 'Ищем файлы для обновления',
    ongoing: 'Ищем файлы для обновления',
    finished: null,
  },
  GET_FILES_SUMMARY_SIZE: {
    started: 'Считаем размер файлов для загрузки',
    ongoing: 'Считаем размер файлов для загрузки',
    finished: null,
  },
  DOWNLOAD_LIST_OF_FILES: {
    started: 'Загружаем обновленные файлы',
    ongoing: 'Загружаем обновленные файлы',
    finished: null,
  }
};

class UpdateBlock extends React.Component {
  serverMeta = null;
  hashList = null;
  changeList = null;

  state = {
    isOnUpdate: false,
    actionName: null,
    progress: 0,
    absoluteProgress: null,
  };

  onGetServerHashlist = ({ action, progress, result = null }) => {
    action === 'started' && this.setState({ isOnUpdate: true });
    this.setState({
      actionName: TEXT_FOR_ACTION_STEPS.GET_SERVER_HASHLIST[action || 'finished'],
      progress,
    }, () => {
      if (action === 'finished') {
        this.serverMeta = result;
        Dispatcher.dispatch(ACTIONS.GET_FILES_HASH, result);
        console.log("Server hash list: ", result);
      }
    });
  }

  onGetFilesHash = ({ action, progress, absoluteProgress = null, result = null }) =>
    this.setState({
      actionName: TEXT_FOR_ACTION_STEPS.GET_FILES_HASH[action || 'finished'],
      progress,
      absoluteProgress,
    }, () => {
      if (action === 'finished') {
        this.hashList = result;
        Dispatcher.dispatch(ACTIONS.GET_LIST_OF_CHANGED_FILES, { serverList: this.serverMeta, clientList: this.hashList });
        console.log("Changed files list: ", result);
      }
    });

  onFileListChangeFormation = ({ action, progress, result = null }) =>
    this.setState({
      actionName: TEXT_FOR_ACTION_STEPS.GET_LIST_OF_CHANGED_FILES[action || 'finished'],
      progress,
    }, () => {
      if (action === 'finished') {
        this.changeList = result;
        Dispatcher.dispatch(ACTIONS.GET_FILES_SUMMARY_SIZE, this.changeList, this.serverMeta);
        console.log("List of download: ", result);
      }
    });

  onFileSizeCalc = ({ action, progress, absoluteProgress = null, result = null }) =>
    this.setState({
      actionName: TEXT_FOR_ACTION_STEPS.GET_FILES_SUMMARY_SIZE[action || 'finished'],
      progress,
      absoluteProgress,
    }, () => {
      if (action === 'finished') {
        this.summarySize = result;
        Dispatcher.dispatch(ACTIONS.DOWNLOAD_LIST_OF_FILES, this.changeList, this.serverMeta, this.summarySize);
        console.log("Summary file size: ", result);
      }
    });

  onFileDownload = ({ action, progress, absoluteProgress = null }) =>
    this.setState({ 
      actionName: TEXT_FOR_ACTION_STEPS.DOWNLOAD_LIST_OF_FILES[action || 'finished'],
      progress,
      absoluteProgress
    }, () => {
      if (action === 'finished') {
        this.setState({
          isOnUpdate: false,
          actionName: 'Обновлено',
          progress: 100,
        })
      }
    });

  componentDidMount() {
    Dispatcher.on(ACTIONS.GET_SERVER_HASHLIST, (_, payload) => this.onGetServerHashlist(payload));
    Dispatcher.on(ACTIONS.GET_FILES_HASH, (_, payload) => this.onGetFilesHash(payload));
    Dispatcher.on(ACTIONS.GET_LIST_OF_CHANGED_FILES, (_, payload) => this.onFileListChangeFormation(payload));
    Dispatcher.on(ACTIONS.GET_FILES_SUMMARY_SIZE, (_, payload) => this.onFileSizeCalc(payload));
    Dispatcher.on(ACTIONS.DOWNLOAD_LIST_OF_FILES, (_, payload) => this.onFileDownload(payload));
  }

  render() {
    const { isOnUpdate, actionName, progress, absoluteProgress } = this.state;

    return (
      <Elements.Wrapper>
        <ProgressBar progress = {progress} action = {actionName} absoluteProgress = {absoluteProgress} />
        <Elements.ButtonsContainer>
          <StartButton active = {!isOnUpdate} withoutUpdate = {actionName !== 'Обновлено'} onClick = {() => Dispatcher.dispatch(ACTIONS.START_EXE)} />
          <UpdateButton isLoading = {isOnUpdate} isUpdated = {actionName === 'Обновлено'} onClick = {() => Dispatcher.dispatch(ACTIONS.GET_SERVER_HASHLIST)}/>
        </Elements.ButtonsContainer>
      </Elements.Wrapper>
    )
  }
}

export default UpdateBlock;