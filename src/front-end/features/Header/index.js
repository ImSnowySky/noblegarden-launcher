import React from 'react';
import ACTIONS from 'connector/actions';
import Dispatcher from 'connector/dispatcher';
import * as Elements from './elements';
import logoIcon from 'assets/header/logo-image.png';

const onCloseClick = () => Dispatcher.dispatch(ACTIONS.CLOSE_LAUNCHER);
const onSettingsClick = () => Dispatcher.dispatch(ACTIONS.TOGGLE_SETTINGS);

const Header = () => <Elements.Container>
  <Elements.InnerContainer>
    <Elements.LogoBlock>
      <img src = {logoIcon} alt = 'Noblegarden' />
      <Elements.NameBlock>
        <Elements.Title>Noblegarden</Elements.Title>
        <Elements.Subtitle>Ролевой сервер World of Warcraft</Elements.Subtitle>
      </Elements.NameBlock>
    </Elements.LogoBlock>
    <Elements.MoveWindowBlock />
    <Elements.SettingsBlock onClick = {onSettingsClick} />
    <Elements.CloseBlock onClick = {onCloseClick}/>
  </Elements.InnerContainer>
</Elements.Container>

export default Header;