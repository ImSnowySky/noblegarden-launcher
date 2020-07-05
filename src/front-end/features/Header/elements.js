import styled from 'styled-components';
import closeImg from 'assets/header/close.svg';
import getColor, { COLORS } from 'front/features/shared/colors';

export const Container = styled.div`
  background-color: ${getColor(COLORS.MAIN, 100)};
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0 0 5px black;
  border-bottom: 1px solid black;
`;

export const InnerContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: 60px;
  position: relative;
  top: 0;
  left: 0;
`;

export const LogoBlock = styled.div`
  width: calc(100%  - 48px);
  -webkit-app-region: drag;
  display: flex;
  align-items: center;

  img {
    height: 48px;
  }
`;

export const NameBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
  font-family: 'Roboto Slab', serif;
`;

export const Title = styled.div`
  text-transform: uppercase;
  font-size: 24px;
  line-height: 24px;
  text-transform: uppercase;
  font-weight: bold;
  color: ${getColor(COLORS.WHITE, 85)};
`;

export const Subtitle = styled.div`
  font-size: 13px;
  line-height: 20px;
  color: ${getColor(COLORS.WHITE, 85)};
`;

export const CloseBlock = styled.div`
  width: 24px;
  height: 24px;
  background-image: url(${closeImg});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 0.75;
  transition: opacity 125ms ease-in-out;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

export const MoveWindowBlock = styled.div`
  position: absolute;
  width: 56%;
  height: 48px;
  background: ${getColor(COLORS.BLACK, 35)};
  top: -30%;
  left: 62%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateX(-50%);
  height: 32px;
  border-radius: 16px;
  z-index: 1000;
`;