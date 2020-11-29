import React from 'react';
import ACTIONS from 'connector/actions';
import Dispatcher from 'connector/dispatcher';
import * as Elements from './elements';
import News from './components/NewsCard';
import Online from './components/OnlineCard';
import Social from './components/SocialCard';
import Squares from './components/Squares';

class ContentBlock extends React.Component {
  state = {
    vk: { loading: true, link: null },
    discord: { loading: true, link: null },
    discord: { loading: true, link: null },
    online: { loading: true, count: null },
    news: { loading: true, data: null },
  };

  componentDidMount() {
    Dispatcher.on(ACTIONS.GET_ONLINE_COUNT, (_, payload) => this.onOnlineCountGet(payload));
    Dispatcher.on(ACTIONS.GET_LAST_NEWS, (_, payload) => this.onNewsGet(payload));
    Dispatcher.on(ACTIONS.GET_VK_LINK, (_, payload) => this.onVKLinkGet(payload));
    Dispatcher.on(ACTIONS.GET_DISCORD_LINK, (_, payload) => this.onDiscordLinkGet(payload));
    Dispatcher.dispatch(ACTIONS.GET_ONLINE_COUNT);
    Dispatcher.dispatch(ACTIONS.GET_LAST_NEWS);
    Dispatcher.dispatch(ACTIONS.GET_VK_LINK);
    Dispatcher.dispatch(ACTIONS.GET_DISCORD_LINK);
  }

  onVKLinkGet = ({ action, result }) =>
    this.setState({ 
      vk: {
        loading: action === 'started',
        link: result,
      },
    });

  onDiscordLinkGet = ({ action, result }) =>
    this.setState({ 
      discord: {
        loading: action === 'started',
        link: result,
      },
    });

  onOnlineCountGet = ({ action, result }) =>
    this.setState({ 
      online: {
        loading: action === 'started',
        count: result,
      }
    });

  onNewsGet = ({ action, result }) =>
    this.setState({
      news: {
        loading: action === 'started',
        data: result,
      },
    });

  render() {
    const { loading: isOnlineLoading, count: onlineCount } = this.state.online;
    const { loading: isNewsLoading, data: newsData } = this.state.news;

    return (
      <Elements.Container>
        <Elements.NewsCardContainer>
          <News loading = {isNewsLoading} data = {newsData} />
        </Elements.NewsCardContainer>
        <Elements.OtherCardsContainer>
          <Social vk = {this.state.vk} discord = {this.state.discord} />
          <Online loading = {isOnlineLoading} online = {onlineCount} />
          <Squares />
        </Elements.OtherCardsContainer>
      </Elements.Container>
    )
  }
}

export default ContentBlock;