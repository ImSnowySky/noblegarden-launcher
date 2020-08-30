import React from 'react';
import * as Elements from './elements';

const errorByType = type => {
  const errorTypes = {
    'unknown': <p style = {{ textAlign: 'center' }}>
      Что-то пошло не так.<br />Пожалуйста, попробуйте позже.
    </p>,
    'not-working': <p style = {{ textAlign: 'center' }}>
      Сервер обновления не отвечает<br />Пожалуйста, попробуйте позже.
    </p>,
    'not-last-version': <>
      Кажется, вы используете не последнюю версию лаунчера. Дальнейшее его использование приведет к проблемам и сбоям в работе клиента.
      <br /><br />
      Обновите ланучер через сайт проекта.
    </>,
  };

  return errorTypes[type] || errorTypes.unknown;
}

const ErrorBlock = ({ errorType = 'not-working' }) => 
  <Elements.Container>
    <Elements.Header>Упс!</Elements.Header>
    <Elements.Content>
      { errorByType(errorType) }
    </Elements.Content>
  </Elements.Container>

export default ErrorBlock;