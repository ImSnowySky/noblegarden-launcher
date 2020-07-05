import React from 'react';
import * as Elements from './elements';
import ACTIONS from 'connector/actions';
import Dispatcher from 'connector/dispatcher';

const Square = ({ name, image, link }) => <Elements.Container onClick = {() => Dispatcher.dispatch(ACTIONS.OPEN_LINK, link)}>
  <Elements.Background url = {image} />
  <Elements.Gradient />
  <Elements.Name>{name}</Elements.Name>
</Elements.Container>

export default Square;