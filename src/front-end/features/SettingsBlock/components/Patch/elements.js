import styled, { css } from 'styled-components';
import getColor, { COLORS } from 'front/features/shared/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${getColor(COLORS.WHITE, 100)};
  margin-top: 8px;
  font-family: 'Rubik', sans-serif;
  position: relative;
  top: 0;
  left: 0;

  & ~ & {
    margin-top: 16px;
  }
`;

export const Name = styled.span`
  font-size: 14px;
  line-height: 20px;
  font-weight: bold;
  color: ${getColor(COLORS.MAIN, 85)};
`;

export const Description = styled.div`
  font-size: 12px;
  line-height: 18px;
  color: ${getColor(COLORS.MAIN, 85)};  
`;

export const Selector = styled.div`
  width: 36px;
  height: 16px;
  border-radius: 20px;
  border: 1px solid ${getColor(COLORS.BLACK, 30)};
  background-color: ${getColor(COLORS.BLACK, 10)};
  position: relative;
  top: 0;
  left: 0;
  transition: background-color 125ms ease-in-out, border-color 125ms ease-in-out;

  &::after {
    display: block;
    width: 12px;
    height: 12px;
    content: '';
    background-color: ${getColor(COLORS.MAIN, 60)};
    position: absolute;
    left: 2px;
    top: 2px;
    border-radius: 50%;
    transition: background-color 125ms ease-in-out, left 125ms ease-in-out;
  }

  &:hover {
    &::after {
      background-color: ${getColor(COLORS.SUCCESS, 60)}
    }
  }

  ${props => props.selected && css`
    background-color: ${getColor(COLORS.SUCCESS, 20)};
    border-color: ${getColor(COLORS.SUCCESS, 100)};

    &::after {
      background-color: ${getColor(COLORS.SUCCESS, 80)};
      left: calc(100% - 14px);
    }
  `};
`;

export const SelectorContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  cursor: pointer;
`;