import React from 'react';
import ACTIONS from 'connector/actions';
import Dispatcher from 'connector/dispatcher';
import * as Elements from './elements';
import Header from 'front/features/Header';
import ContentBlock from 'front/features/ContentBlock';
import UpdateBlock from 'front/features/UpdateBlock';
import SettingsBlock from 'front/features/SettingsBlock';
import Preloader from '../shared/Preloader/index';
import ErrorBlock from '../ErrorBlock';

class Main extends React.Component {
  state = {
    loading: true,
    isVersionOK: false,
    isAccessGranted: false,
  }

  componentDidMount() {
    Dispatcher.on(ACTIONS.CHECK_LAUNCHER_VERSION, (_, payload) => this.onLauncherVersionGet(payload));
    Dispatcher.on(ACTIONS.CHECK_LAUNCHER_FOLDER_ACCESS, (_, payload) => this.onLauncherFolderAccess(payload));
    Dispatcher.dispatch(ACTIONS.CHECK_LAUNCHER_VERSION);
    Dispatcher.dispatch(ACTIONS.GET_CUSTOM_PATCHES);
  }

  onLauncherVersionGet = ({ action, result }) =>
    this.setState({ 
      loading: true,
      isVersionOK: result,
    }, () => {
      if (action !== 'finished') return;
      Dispatcher.dispatch(ACTIONS.CHECK_LAUNCHER_FOLDER_ACCESS);      
    });

  onLauncherFolderAccess = ({ action, result }) =>
    this.setState({
      loading: action === 'started',
      isAccessGranted: result,
    });

  errorType = () => {
    const { isVersionOK = false, isAccessGranted = false } = this.state;    
    if (isVersionOK === 'not-working') return isVersionOK;
    if (!isVersionOK) return 'not-last-version';
    if (isAccessGranted !== null) return 'no-access';

    return null;
  }

  render() {
    const { loading = false, isAccessGranted = null } = this.state;
    const errorType = this.errorType();

    return (
      <Elements.Container withImage = {!loading}>
        {
          loading
            ? <Preloader />
            : <>
                <Elements.Gradient />
                <Header />
                {
                  !errorType
                    ? <>
                        <ContentBlock />
                        <UpdateBlock />
                        <SettingsBlock />
                      </>
                    : <ErrorBlock errorType = {errorType} msg = {isAccessGranted}/>
                }
                <Elements.Version>v1.1.0</Elements.Version>
              </>
        }
      </Elements.Container>
    )
  }
};

export default Main;