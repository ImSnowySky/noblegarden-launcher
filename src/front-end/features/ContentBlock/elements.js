import styled from 'styled-components';

export const Container = styled.div`
  width: 824px;
  margin: 0 auto;
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  height: 400px;
  margin-top: 36px;
  box-sizing: border-box;
`;

export const NewsCardContainer = styled.div`
  width: calc(70% - 24px);
  margin-right: 24px;
`;

export const OtherCardsContainer = styled.div`
  width: 30%;

  & > *:not(:last-child) {
    margin-bottom: 32px;
  }
`;