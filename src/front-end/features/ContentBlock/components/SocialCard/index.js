import React from 'react';
import ACTIONS from 'connector/actions';
import Dispatcher from 'connector/dispatcher';
import * as Elements from './elements';

const clickOnLink = link => Dispatcher.dispatch(ACTIONS.OPEN_LINK, link);

const Social = () => <Elements.Container>
  <Elements.Discord onClick = {() => clickOnLink('https://discord.com/invite/6B93vQ?utm_source=Discord%20Widget&utm_medium=Connect')}>
    <Elements.DefaultLayer>
      <Elements.DiscordImage />
    </Elements.DefaultLayer>
    <Elements.HoverLayer>
      Наш Discord
    </Elements.HoverLayer>
  </Elements.Discord>
  <Elements.VK onClick = {() => clickOnLink('https://vk.com/noblegarden')}>
    <Elements.DefaultLayer>
      <Elements.VKImage />
    </Elements.DefaultLayer>
    <Elements.HoverLayer>
      Группа VK
    </Elements.HoverLayer>
  </Elements.VK>
</Elements.Container>

export default Social;