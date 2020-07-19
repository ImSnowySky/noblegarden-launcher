import React from 'react';
import * as Elements from './elements';
import Preloader from 'front/features/shared/Preloader';

const UpdateButton = ({ isLoading = false, isUpdated = false, onClick = () => { } }) =>
  <Elements.Container onClick = {onClick} isLoading = {isLoading} isUpdated = {isUpdated}>
    {
      isLoading
        ? <Preloader />
        : 'Обновить'
    }
  </Elements.Container>

export default UpdateButton;