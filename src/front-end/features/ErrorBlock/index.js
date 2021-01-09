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
      <span style = {{ fontSize: 13, lineHeight: 1.25 }}>Запустите лаунчер от имени администратора и проверьте правильность его установки</span>
    </p>,
    'no-file-access': <p style = {{ textAlign: 'center' }}>
      Нет доступа на изменение файла
      <br /><br />
      <span style = {{ color: 'darkred' }}>{msg}</span>
      <br /><br />
      <span style = {{ fontSize: 13, lineHeight: 1.25 }}>Запустите лаунчер от имени администратора, закройте все иные программы, которые используют этот файл, если они есть</span>
    </p>,
    'can-not-rename-file': <p style = {{ textAlign: 'center' }}>
      Не удалось переименовать файл
      <br /><br />
      <span style = {{ color: 'darkred' }}>{msg}</span>
      <br /><br />
      <a href = "https://noblegarden.net/article/27889" style = {{ fontSize: 16, lineHeight: 1.25 }}>Как исправить?</a>
    </p>,
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