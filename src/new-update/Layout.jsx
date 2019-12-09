import styled from 'styled-components';

export const Container = styled.div`
  max-width: 50rem;
  margin: auto;
  padding: 1em;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 2em;
  align-items: center;
`;

export const Main = styled.div`
  margin: 0;
  padding: 0;
  display: grid;
  grid-gap: 3em;
`;

export const Actions = styled.div`
  display: grid;
  justify-items: left;
  margin: 2em 0 0 0;

  @media (max-width: 470px) {
    justify-items: center;
  }
`;

export const Preview = styled.div`
  width: 100%;
  justify-self: end;

  @media (max-width: 760px) {
    justify-self: center;
  }

  @media (max-width: 350px) {
    width: 100%;
  }
`;
