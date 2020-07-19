import React from 'react';
import * as Elements from './elements';

const StartButton = ({ active, withoutUpdate = true, onClick = () => { } }) =>
  <Elements.Container active = {active} isHighlighted = {!withoutUpdate} onClick = {onClick}>
    {
      active
        ? 
          withoutUpdate
            ? <span>Начать<br />без обновления</span>
            : <span>Играть</span>
        : <span>Идёт<br />обновление</span>
    }
    
  </Elements.Container>

export default StartButton;