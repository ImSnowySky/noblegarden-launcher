import styled from 'styled-components';
import getColor, { COLORS } from 'front/features/shared/colors';

export const Container = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  background: ${getColor(COLORS.WHITE, 100)};
  box-shadow: 0 0 15px black;
  box-sizing: border-box;
`;

export const Title = styled.div`
  height: 48px;
  width: 100%;
  display: flex;
  align-items: center;
  color: ${getColor(COLORS.WHITE, 85)};
  background-color: ${getColor(COLORS.HEADER, 100)};
  padding: 0 16px;
  font-size: 20px;
  line-height: 27px;
  font-family: 'Roboto Slab', serif;
  box-sizing: border-box;
`;

export const Content = styled.div`
  display: block;
  width: 100%;
  height: calc(100% - 48px);
  box-sizing: border-box;
  padding: 16px;
  font-family: 'Rubik', sans-serif;
  color: ${getColor(COLORS.TEXT, 85)};
  overflow-x: hidden;
  overflow-y: scroll;
  position: relative;
  top: 0;
  left: 0;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: ${getColor(COLORS.HEADER, 100, 30)};
    transition: background 125ms ease-in-out;
    &:hover {
      background: ${getColor(COLORS.HEADER, 100, 40)};
    }
  }
`;

export const FairyDragonPH = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 300px;
  height: 300px;
`;