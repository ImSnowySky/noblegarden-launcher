import React from 'react';
import * as Elements from './elements';

const ProgressBar = ({ progress, absoluteProgress, action }) =>
  <Elements.Wrapper>
    <Elements.Container>
      <Elements.Progress progress = {progress} />
      {
        absoluteProgress && <Elements.ProgressInAbs>
          {absoluteProgress.current}/{absoluteProgress.end}
        </Elements.ProgressInAbs>
      }
    </Elements.Container>
    <Elements.LoadingInfo>{action}</Elements.LoadingInfo>
  </Elements.Wrapper>

export default ProgressBar;