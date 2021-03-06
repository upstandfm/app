import styled from 'styled-components';

export const Aside = styled.aside`
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
  width: 40rem;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

export const ExitContainer = styled.div`
  position: absolute;
  top: 2em;
  right: 2em;

  @media (max-width: 480px) {
    top: 0.5em;
    right: 0.5em;
  }
`;

export const Title = styled.h1`
  font-size: 2em;
`;
