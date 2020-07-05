import styled from 'styled-components';
import getColor, { COLORS } from 'front/features/shared/colors';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  flex: none;
  position: relative;
  top: 0;
  left: 0;
  cursor: pointer;
  transition: margin-left 125ms ease-in-out;
`;

export const Gradient = styled.div`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${`linear-gradient(180deg, transparent, ${getColor(COLORS.HEADER, 100)} 85%)`};
  pointer-events: none;
`;

export const Background = styled.div`
  z-index: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${({ url }) => url});
  background-position: center center;
  background-size: 100% 100%;
  transition: background-size 125ms ease-in-out;
`;

export const Name = styled.span`
  width: 100%;
  box-sizing: border-box;
  padding: 0 12px 12px;
  font-size: 18px;
  line-height: 27px;
  color: ${getColor(COLORS.WHITE, 80)};
  font-family: 'Roboto Slab', serif;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2;
`;