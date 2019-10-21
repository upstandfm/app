import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 1em;
  align-items: center;
  padding: 1em;
`;

export const Actions = styled.div`
  display: grid;
  justify-items: end;
  padding: 2em 0;

  @media (max-width: 470px) {
    justify-items: center;
    padding: 1em 0;
  }
`;

export const Main = styled.div``;

export const Subtitle = styled.h2`
  margin: 0 0 1em 0;
  font-weight: normal;
  color: ${props => (props.isToday ? 'var(--color-purple)' : 'inherit')};
`;
