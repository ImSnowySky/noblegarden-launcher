import styled, { css } from 'styled-components';
import { Button } from '../../elements';
import getColor, { COLORS } from 'front/features/shared/colors';

export const Container = styled(Button)`
  color: ${getColor(COLORS.WHITE, 100)};
  margin-right: 8px;
  text-align: center;
  font-size: 13px;
  line-height: 19px;

  ${props => props.active && css`
    background-color: ${getColor(COLORS.HEADER, 80)};

    &:hover {
      background-color: ${getColor(COLORS.HEADER, 100)};
    }
  `};

  ${props => !props.active && css`
    pointer-events: none;
    background-color: gray;
    box-shadow: none;
  `};

  ${props => props.isHighlighted && css`
    background-color: rgb(60, 170, 40);

    &:hover {
      background-color: rgb(80, 190, 60);
    }
  `};
`;