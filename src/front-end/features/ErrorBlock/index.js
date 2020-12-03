import React from 'react';
import * as Elements from './elements';

const errorByType = (type, msg) => {
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
    'no-access': <p style = {{ textAlign: 'center' }}>
      Нет доступа на чтение/запись в директорию
      <br /><br />
      <span style = {{ color: 'darkred' }}>{msg}</span>
      <br /><br />
      <span style = {{ fontSize: 12, color: 'orange' }}>Запустите от имени администратора и проверьте правильность установки</span>
    </p>
  };

  return errorTypes[type] || errorTypes.unknown;
}

const ErrorBlock = ({ errorType = 'unknown', msg = null }) => 
  <Elements.Container>
    <Elements.Header>Упс!</Elements.Header>
    <Elements.Content>
      { errorByType(errorType, msg) }
    </Elements.Content>
  </Elements.Container>

export default ErrorBlock;