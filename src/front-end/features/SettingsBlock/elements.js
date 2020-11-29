import styled, { css } from 'styled-components';
import getColor, { COLORS } from 'front/features/shared/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px;
  right: -304px;
  width: 284px;
  height: 100%;
  background-color: ${getColor(COLORS.WHITE, 100)};
  box-sizing: border-box;
  z-index: 1000;
  transition: right 150ms ease-in-out;
  box-shadow: -15px 0px 20px ${getColor(COLORS.BLACK, 55)};

  ${props => props.isOpened && css`
    right: 0;
  `}
`;

export const Title = styled.div`
  margin-top: 36px;
  margin-left: 12px;
  color: ${getColor(COLORS.MAIN, 85)};
  font-size: 20px;
  line-height: 27px;
  font-family: 'Roboto Slab', serif;
  box-sizing: border-box;
`;