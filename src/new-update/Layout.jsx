import styled from 'styled-components';

export const Container = styled.div`
  max-width: 50rem;
  margin: auto;
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
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
  grid-template-columns: 2fr 1fr;
  grid-gap: 3em;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

export const Preview = styled.div`
  justify-self: end;

  @media (max-width: 760px) {
    justify-self: center;
  }

  @media (max-width: 350px) {
    width: 100%;
  }
`;

export const PreviewText = styled.p`
  color: var(--color-grey);
  letter-spacing: 1px;
  margin: 0 0 0.5em 0;
`;