import styled from 'styled-components';
import Link from 'front/features/shared/Link';
import getColor, { COLORS } from 'front/features/shared/colors';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 60px;
  border-radius: 4px;
  box-shadow: 0 0 5px ${getColor(COLORS.BLACK, 85)};
  overflow: hidden;

  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;

    & > span:first-of-type {
      font-size: 20px;
      line-height: 24px;
      margin-top: -4px;
    }
  }
`;

export const Left = styled.div`
  width: 55%;
  background: ${getColor(COLORS.HEADER, 100)};
  color: ${getColor(COLORS.WHITE, 100)};
  padding-left: 16px;
  font-family: 'Roboto Slab', serif;

  & > span:last-of-type {
    font-size: 14px;
    line-height: 16px;
  }
`;

export const Right = styled.div`
  background: ${getColor(COLORS.WHITE, 100)};
  color: ${getColor(COLORS.BLACK, 85)};
  padding-right: 16px;
  width: 45%;
  align-items: flex-end;
  text-align: right;
  font-family: 'Rubik', sans-serif;

  & > span:first-of-type {
    font-size: 16px !important;
  }

  & > ${Link}:last-of-type {
    font-size: 14px;
    line-height: 16px;
  }
`;