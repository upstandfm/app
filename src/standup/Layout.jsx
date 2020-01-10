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

  @media (max-width: 680px) {
    grid-template-columns: auto;
    justify-items: center;
    grid-gap: 0.5em;
  }
`;

export const NavContainer = styled.div`
  display: grid;
  align-items: center;
  height: 40px;
  margin-left: 3em;

  @media (max-width: 680px) {
    justify-self: left;
  }
`;

export const Main = styled.div`
  grid-area: standup-main;
  overflow: auto;
`;

export const Footer = styled.div`
  grid-area: standup-footer;
  border-top: 1px solid var(--color-light-grey);
  background-color: var(--color-white);
  margin: 0;
  padding: 1em;
  z-index: 1;
`;
