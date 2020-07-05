import React from 'react';
import * as Elements from './elements';
import Header from 'front/features/Header';
import ContentBlock from 'front/features/ContentBlock';
import UpdateBlock from 'front/features/UpdateBlock';

const Main = () =>
  <Elements.Container>
    <Elements.Gradient />
    <Header>123</Header>
    <ContentBlock />
    <UpdateBlock />
  </Elements.Container>

export default Main;