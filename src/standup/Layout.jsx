import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'standup-header'
    'standup-main'
    'standup-footer';
`;

export const Header = styled.div`
  grid-area: standup-header;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 1em;
  align-items: center;
  padding: 0.5em 1em;
  margin: 0 0 1.5em 0;

  @media (max-width: 680px) {
    grid-template-columns: auto;
    justify-items: center;
    grid-gap: 0.5em;
  }
`;

export const Main = styled.div`
  grid-area: standup-main;
  overflow: auto;
`;

export const Footer = styled.div`
  grid-area: standup-footer;
  box-shadow: 0 -3px 3px -3px rgba(0, 0, 0, 0.2);
  background-color: var(--color-white);
  margin: 0;
  padding: 1em;
  z-index: 1;
`;
