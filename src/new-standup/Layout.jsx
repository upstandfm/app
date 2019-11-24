import styled from 'styled-components';

export const Container = styled.div`
  margin: 2em 1em;
  padding: 1em;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  background-color: var(--color-white);
  border: 1px solid var(--color-light-grey);
  border-radius: var(--radius-size);
  box-shadow: 6px 6px 0 0 var(--color-light-grey);
`;

export const Wrapper = styled.div`
  width: 50rem;
  margin: 0 auto;
  padding: 1em 0;

  @media (max-width: 870px) {
    width: 100%;
  }
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
