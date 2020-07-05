import React from 'react';
import * as Elements from './elements';

const StartButton = ({ active, withoutUpdate = true, onClick = () => { } }) =>
  <Elements.Container active = {active} onClick = {onClick}>
    {
      active
        ? 
          withoutUpdate
            ? <span>Начать<br />без обновления</span>
            : <span>Начать</span>
        : <span>Идёт<br />обновление</span>
    }
    
  </Elements.Container>

export default StartButton;