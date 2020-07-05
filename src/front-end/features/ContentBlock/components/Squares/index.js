import React, { useState } from 'react';
import * as Elements from './elements';
import data from './data';
import Square from './components/Square';

const moveUp = (squares, active, changeActive) => {
  const nextActive = active + 1;
  if (nextActive < squares.length && nextActive >= 0) changeActive(nextActive);
  else changeActive(0);
}

const moveDown = (squares, active, changeActive) => {
  const nextActive = active - 1;
  if (nextActive >= 0) changeActive(nextActive);
  else changeActive(squares.length - 1);
}

const Squares = () => {
  const [active, changeActive] = useState(0);
  return (
    <Elements.Container current = {active}>
      { data.map((square, i) => <Square {...square} key = {i} />) }
      <Elements.Controller>
        <Elements.Backward onClick = {() => moveDown(data, active, changeActive)}>{'<'}</Elements.Backward>
        <Elements.Forward onClick = {() => moveUp(data, active, changeActive)}>{'>'}</Elements.Forward>
      </Elements.Controller>
    </Elements.Container>
  )
}

export default Squares;