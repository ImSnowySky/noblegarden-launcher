import styled from 'styled-components';
import getColor, { COLORS } from 'front/features/shared/colors';

export const Wrapper = styled.div`
  width: calc(70% - 24px);
  height: 24px;
`;

export const Container = styled.div`
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${getColor(COLORS.BLACK, 60)};
  border: 1px solid ${getColor(COLORS.WHITE, 60)};
  box-shadow: 0 -2px 8px ${getColor(COLORS.BLACK, 100)} inset;
`;

export const Progress = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.progress}%;
  height: 100%;
  background: ${getColor(COLORS.LINK, 100)};

  transition: width 125ms linear;
`;

export const LoadingInfo = styled.div`
  margin-top: 8px;
  width: 100%;
  color: ${getColor(COLORS.WHITE, 100)};
  font-size: 12px;
  line-height: 16px;
  font-family: 'Rubik', sans-serif;
`;

export const ProgressInAbs = styled.div`
  position: absolute;
  top: 32px;
  right: 0;
  text-align: right;
  color: ${getColor(COLORS.WHITE, 100)};
  font-size: 12px;
  line-height: 16px;
  font-family: 'Rubik', sans-serif;
`;