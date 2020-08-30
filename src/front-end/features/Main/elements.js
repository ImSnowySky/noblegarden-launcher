import styled, { css, keyframes } from 'styled-components';
import backrgoundIMG from 'assets/main/bg.png';
import getColor, { COLORS } from 'front/features/shared/colors';

const backgroundAnim = keyframes`
  0% {
    background-position: 35% 15%;
  }
  25% {
    background-position: 15% 0%;
  }
  50% {
    background-position: 35% 15%;
  }
  75% {
    background-position: 50% 30%;
  }
  100% {
    background-position: 35% 15%;
  }
`;

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 4px solid ${getColor(COLORS.MAIN, 100)};
  border-top: 0;
  box-sizing: border-box;
  background-size: 2480px;
  background-repeat: no-repeat;
  background-position: 0 0;
  position: relative;
  flex-direction: column;
  top: 0;
  left: 0;
  animation: ${backgroundAnim} 60s  ease-in-out infinite;

  ${props => props.withImage && css`
    background: ${getColor(COLORS.WHITE, 100)};
    background-image: url(${backrgoundIMG});
  `}

  ${props => !props.withImage && css`
    background: ${getColor(COLORS.MAIN, 100)};
  `};
`;

export const Gradient = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: ${`linear-gradient(180deg,transparent, ${getColor(COLORS.MAIN, 100)} 85%)`};
  width: 100%;
  height: 100%;
  pointer-events: none;
`;