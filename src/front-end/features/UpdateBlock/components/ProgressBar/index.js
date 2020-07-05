import React from 'react';
import * as Elements from './elements';

const ProgressBar = ({ progress, action }) =>
  <Elements.Wrapper>
    <Elements.Container>
      <Elements.Progress progress = {progress} />
    </Elements.Container>
    <Elements.LoadingInfo>{action}</Elements.LoadingInfo>
  </Elements.Wrapper>

export default ProgressBar;