import styled, { css } from 'styled-components';
import { Button } from '../../elements';
import getColor, { COLORS } from 'front/features/shared/colors';

export const Container = styled(Button)`
  background-color: ${getColor(COLORS.LINK, 80)};
  color: ${getColor(COLORS.WHITE, 100)};
  margin-left: 8px;

  pointer-events: ${props => props.isLoading ? 'none' : null};

  &:hover {
    background-color: ${getColor(COLORS.LINK, 100)};
  }

  img { width: 60px }

  ${props => props.isUpdated && css`
    background-color: gray;
    pointer-events: none;
  `};
`;