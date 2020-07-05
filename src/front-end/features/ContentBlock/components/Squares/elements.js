import styled from 'styled-components';
import getColor, { COLORS } from 'front/features/shared/colors';
import { Container as SquareContainer, Background as SquareBackgronud } from './components/Square/elements';

export const Container = styled.div`
  height: 216px;
  width: 100%;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 15px ${getColor(COLORS.BLACK, 85)};
  overflow: hidden;

  ${SquareContainer}:first-of-type {
    margin-left: ${({ current }) => `${-100 * current}%`};
  }

  &:hover {
    ${SquareBackgronud} {
      background-size: 110% 110%;
    }
  }
`;

export const Controller = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;
  box-sizing: border-box;
  padding: 0 8px 12px 0;
  padding-bottom: 12px;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const ControllerElement = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${getColor(COLORS.BLACK, 85)};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${getColor(COLORS.WHITE, 100)};
  font-family: 'Roboto Slab', serif;
  font-size: 16px;
  line-height: 22px;
  font-weight: bold;
  user-select: none;
  
  transition: background-color 125ms ease-in-out, color 125ms ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${getColor(COLORS.BLACK, 100)};
    color: ${getColor(COLORS.LINK, 100)};
  }
`;

export const Backward = styled(ControllerElement)`
  margin-right: 8px;
`;

export const Forward = styled(ControllerElement)``;

/*

export const Name = styled.div`
  position: absolute;
  display: inline-block;
  width: auto;
  bottom: 0;
  left: 0;
  padding: 0 12px 12px;
  font-size: 18px;
  line-height: 27px;
  color: ${getColor(COLORS.WHITE, 80)};
  font-family: 'Roboto Slab', serif;
  transition: color 125ms ease-in-out;
  cursor: pointer;

  &:hover {
    color: ${getColor(COLORS.LINK, 100)};
  }
`;

export const ForwardBackward = styled.div`
  position: absolute;
  display: inline-block;
  width: auto;
  bottom: 0;
  right: 0;
  padding: 0 12px 12px;
  font-size: 18px;
  line-height: 27px;

  span {
    color: ${getColor(COLORS.WHITE, 80)};
    transition: color 125ms ease-in-out;
    cursor: pointer;
    padding: 8px;

    &:hover {
      color: ${getColor(COLORS.LINK, 100)};
    }
  }
`;
*/