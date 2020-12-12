import React from 'react';
import ACTIONS from 'connector/actions';
import Dispatcher from 'connector/dispatcher';
import * as Elements from './elements';
import Link from 'front/features/shared/Link';
import Preloader from 'front/features/shared/Preloader';

const openOnlineCount = () => Dispatcher.dispatch(ACTIONS.OPEN_LINK, 'https://noblegarden.net/armory/character-list');

const Online = ({ loading, online }) => <Elements.Container>
  <Elements.Left>
    <span>Сейчас</span>
    <span>на сервере</span>
  </Elements.Left>
  <Elements.Right>
    {
      loading 
        ? <Preloader />
        : <>
            <span>{online}</span>
            <Link onClick = {openOnlineCount}>подробнее</Link>
          </>
    }
  </Elements.Right>
</Elements.Container>

export default Online;