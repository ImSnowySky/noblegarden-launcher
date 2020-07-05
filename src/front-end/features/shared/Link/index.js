import styled from 'styled-components';
import getColor, { COLORS } from '../colors';

export default styled.a`
  color: ${getColor(COLORS.LINK, 100)};
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  border-bottom: 1px solid transparent;
  transition: border-bottom 125ms ease-in-out;

  &:hover {
    border-bottom: 1px solid ${getColor(COLORS.LINK, 100)};
  }
`;