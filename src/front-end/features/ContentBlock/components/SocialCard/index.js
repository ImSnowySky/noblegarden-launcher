import React from 'react';
import ACTIONS from 'connector/actions';
import Dispatcher from 'connector/dispatcher';
import * as Elements from './elements';
import Preloader from 'front/features/shared/Preloader';

const clickOnLink = link => Dispatcher.dispatch(ACTIONS.OPEN_LINK, link);

const Social = ({ vk = { }, discord = { } }) => <Elements.Container>
  <Elements.Discord isLoading = {discord.loading} onClick = {() => clickOnLink(discord.link || '#')}>
  {
    discord.loading
      ? <Preloader />
      : <>
          <Elements.DefaultLayer>
            <Elements.DiscordImage />
          </Elements.DefaultLayer>
          <Elements.HoverLayer>
            Наш Discord
          </Elements.HoverLayer>
        </>
  }
  </Elements.Discord>
  <Elements.VK isLoading = {vk.loading} onClick = {() => clickOnLink(vk.link || '#')}>
  {
    vk.loading
      ? <Preloader />
      : <>
          <Elements.DefaultLayer>
            <Elements.VKImage />
          </Elements.DefaultLayer>
          <Elements.HoverLayer>
            Группа VK
          </Elements.HoverLayer>
        </>
  }
  </Elements.VK>
</Elements.Container>

export default Social;