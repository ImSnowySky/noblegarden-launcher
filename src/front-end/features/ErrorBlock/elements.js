import styled from 'styled-components';
import getColor, { COLORS } from 'front/features/shared/colors';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  border-radius: 4px;
  border: 4px solid ${getColor(COLORS.ERROR, 100)};
  background-color: ${getColor(COLORS.WHITE, 100)};
  box-shadow: 0 0 5px ${getColor(COLORS.BLACK, 35)};
  padding: 32px 24px;
  min-width: 324px;
  max-width: 500px;
`;

export const Header = styled.div`
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  letter-spacing: 0.02;
  font-family: 'Roboto Slab', serif;
  color: ${getColor(COLORS.BLACK, 85)};
`;

export const Content = styled.div`
  font-family: 'Rubik', sans-serif;
  margin-top: 24px;
  color: ${getColor(COLORS.BLACK, 60)};
  font-size: 20px;
  line-height: 24px;
`;
