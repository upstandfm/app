import styled from 'styled-components';

export const Container = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--color-white);
  display: grid;
  z-index: 1;
`;

export const Wrapper = styled.div`
  margin: auto;
  padding: 1em;
  box-sizing: border-box;
  width: 40%;

  @media (max-width: 780px) {
    width: 70%;
  }

  @media (max-width: 380px) {
    width: 100%;
  }
`;

export const ExitContainer = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
`;

export const Subtitle = styled.h2`
  margin: 0;
  font-weight: normal;
`;
