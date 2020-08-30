import React from 'react';
import ACTIONS from 'connector/actions';
import Dispatcher from 'connector/dispatcher';
import * as Elements from './elements';
import Header from 'front/features/Header';
import ContentBlock from 'front/features/ContentBlock';
import UpdateBlock from 'front/features/UpdateBlock';
import Preloader from '../shared/Preloader/index';
import ErrorBlock from '../ErrorBlock';

class Main extends React.Component {
  state = {
    loading: true,
    isVersionOK: false,
  }

  componentDidMount() {
    Dispatcher.on(ACTIONS.CHECK_LAUNCHER_VERSION, (_, payload) => this.onLauncherVersionGet(payload));
    Dispatcher.dispatch(ACTIONS.CHECK_LAUNCHER_VERSION);
  }

  onLauncherVersionGet = payload => {
    const { action, result } = payload;
    this.setState({ 
      loading: action === 'started',
      isVersionOK: result,
    });
  }

  render() {
    const { loading = false, isVersionOK = false } = this.state;
    return (
      <Elements.Container withImage = {!loading}>
        {
          loading
            ? <Preloader />
            : isVersionOK !== 'not-working' && isVersionOK
              ? <>
                  <Elements.Gradient />
                  <Header />
                  <ContentBlock />
                  <UpdateBlock />
                </>
              : <>
                  <Elements.Gradient />
                  <Header />
                  <ErrorBlock errorType = {isVersionOK === 'not-working' ? 'not-working' : 'not-last-version'} />
                </>
        }
      </Elements.Container>
    )
  }
};

export default Main;