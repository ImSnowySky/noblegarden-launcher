import React from 'react';
import * as Elements from './elements';
import Preloader from 'front/features/shared/Preloader';

const UpdateButton = ({ loading = false, isUpdated = false, onClick = () => { } }) =>
  <Elements.Container onClick = {onClick} loading = {loading} isUpdated = {isUpdated}>
    {
      loading
        ? <Preloader />
        : 'Обновить'
    }
  </Elements.Container>

export default UpdateButton;