import React from 'react';
import ACTIONS from 'connector/actions';
import Dispatcher from 'connector/dispatcher';
import * as Elements from './elements';
import Link from 'front/features/shared/Link';

const clickOnLink = link => Dispatcher.dispatch(ACTIONS.OPEN_LINK, link);

const News = ({ title, author, authorLink, preview, link }) => <Elements.Container>
  <Elements.Title onClick = {() => clickOnLink(link)}>
    {title}
  </Elements.Title>
  <Elements.Author>
    От <Link onClick = {() => clickOnLink(authorLink)}>{author}</Link>
  </Elements.Author>
  <Elements.Content>
    {preview}
  </Elements.Content>
</Elements.Container>

export default News;