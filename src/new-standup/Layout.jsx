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
`;

export const ExitContainer = styled.div`
  position: absolute;
  top: 1em;
  right: 1em;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 2em;
  align-items: center;
`;

export const Title = styled.h1``;

export const SizedContainer = styled.div`
  width: 70%;

  @media (max-width: 570px) {
    width: 100%;
  }
`;

export const Divider = styled.div`
  width: 100%;
  margin: 1em 0;
  padding: 0;
  border-top: 1px solid var(--color-lighter-grey);
`;

export const Subtitle = styled.h2`
  margin: 0;
  font-weight: normal;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 2em 0 0 0;

  @media (max-width: 470px) {
    justify-content: center;
  }
`;
