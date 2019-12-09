import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  padding: 1em;
  background-color: var(--color-white);
  border: 1px solid var(--color-light-grey);
  border-radius: var(--radius-size);
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-gap: 1em;
  align-items: center;
  justify-items: center;
  text-align: center;
`;

export const Subtitle = styled.h3`
  margin: 0;
  font-weight: normal;

  b {
    color: var(--color-dark-red);
  }
`;

export const Info = styled.p`
  margin: 0;
  color: var(--color-grey);
`;
