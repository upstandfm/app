import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 1em;
  align-items: center;
  padding: 1em;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 1em;
  align-items: center;
  padding: 1em 0;

  @media (max-width: 470px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    justify-items: center;
  }
`;

export const Title = styled.h1`
  font-weight: normal;
  margin: 0;
`;

export const Actions = styled.div``;

export const Main = styled.div``;
export const LoadMoreContainer = styled.div`
  display: grid;
  margin: 3em 0 0 0;
`;
