import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  width: 824px;
  margin: 24px auto;
  position: relative;
  top: 0;
  left: 0;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  width: 30%;
  margin-left: 24px;
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 48px;
  box-shadow: 0 0 5px black;
  font-family: 'Rubik';
  font-weight: bold;
  font-size: 16px;
  user-select: none;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 4px;
  transition: background-color 125ms ease-in-out;
`;