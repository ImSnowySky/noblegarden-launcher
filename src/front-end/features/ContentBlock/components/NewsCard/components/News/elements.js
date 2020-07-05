import styled from 'styled-components';
import getColor, { COLORS } from 'front/features/shared/colors';

export const Container = styled.div`
  width: 100%;
  padding-bottom: 12px;
  border-bottom: 1px solid ${getColor(COLORS.TEXT, 35)};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const Title = styled.div`
  width: 100%;
  font-family: 'Roboto Slab', serif;
  font-size: 16px;
  line-height: 23px;
  color: ${getColor(COLORS.TEXT, 85)};
  text-decoration: none;
  transition: color 125ms ease-in-out;
  cursor: pointer;
  margin-bottom: 8px;

  &:hover {
    color: ${getColor(COLORS.LINK, 100)};
  }
`;

export const Author = styled.div`
  width: 100%;
  font-family: 'Rubik', sans-serif;
  font-size: 12px;
  line-height: 17px;
  color: ${getColor(COLORS.TEXT, 60)};
  margin-bottom: 8px;
`;

export const Content = styled.div`
  width: 100%;
  font-family: 'Rubik', sans-serif;
  color: ${getColor(COLORS.TEXT, 85)};
  font-size: 13px;
  line-height: 19px;
`;