import styled, { css } from 'styled-components';
import getColor, { COLORS } from 'front/features/shared/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 61px;
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

export const Content = styled.div`
  padding: 20px 12px 12px;
`;

export const Block = styled.div`
  border-radius: 12px;
  border: 2px solid ${getColor(COLORS.MAIN, 85)};
  padding: 16px 8px 12px;
  box-sizing: border-box;
  position: relative;
  top: 0;
  left: 0;

  &:not(:last-child) {
    margin-bottom: 20px;
  }
`;

export const BlockTitle = styled.div`
  font-size: 16px;
  line-height: 20px;
  font-family: 'Rubik', sans-serif;
  position: absolute;
  top: 0;
  left: 12px;
  transform: translateY(-50%);
  padding: 0 4px;
  background-color: ${getColor(COLORS.WHITE, 100)};
  color: ${getColor(COLORS.MAIN, 85)};
`;


export const BlockRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: calc(100% - 12px);
  padding: 0 10px;

  &:not(:last-child) {
    border-bottom: 1px solid ${getColor(COLORS.MAIN, 5)};
    margin-bottom: 4px;
    padding-bottom: 4px;
  }

  label, span {
    font-size: 14px;
    line-height: 1;
    font-family: 'Rubik', sans-serif;
    color: ${getColor(COLORS.MAIN, 85)};
    margin-top: 5px;
  }

  select {
    width: 82px;
    font-size: 14px;
    font-family: 'Rubik', sans-serif;
    color: ${getColor(COLORS.MAIN, 85)};
    border: 1px solid ${getColor(COLORS.MAIN, 60)};
    padding: 2px;
    border-radius: 6px;
    outline: none;
    transition: border-color 125ms ease-in-out;
    cursor: pointer;

    &:hover, &:active, &:focus {
      border-color: ${getColor(COLORS.MAIN, 85)};
    }

    option {
      font-family: 'Rubik', sans-serif;
      color: ${getColor(COLORS.MAIN, 85)};
      outline: none;
      border: none;
    }
  }
`;