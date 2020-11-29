import React from 'react';
import ACTIONS from 'connector/actions';
import Dispatcher from 'connector/dispatcher';
import * as Elements from './elements';

class SettingsBlock extends React.Component {
  state = { isOpened: false };

  componentDidMount() {
    Dispatcher.on(ACTIONS.TOGGLE_SETTINGS, this.changeOpened);
  }

  changeOpened = () => {
    this.setState({ isOpened: !this.state.isOpened });
  }

  render() {
    const { isOpened = false } = this.state;

    return (
      <Elements.Container isOpened = {isOpened}>
        <Elements.Title>Настройки</Elements.Title>
      </Elements.Container>
    )
  }
}

export default SettingsBlock;