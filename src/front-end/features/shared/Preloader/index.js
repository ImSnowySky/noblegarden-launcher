import React from 'react';
import * as Elements from './elements';
import preloaderIMG from 'assets/preloader/preloader.svg';

const Preloader = () => 
  <Elements.Container>
    <Elements.Image src = {preloaderIMG} />
  </Elements.Container>

export default Preloader;