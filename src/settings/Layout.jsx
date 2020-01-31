import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'settings-header'
    'settings-main';
`;

export const Header = styled.div`
  grid-area: settings-header;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 1em;
  align-items: center;
  padding: 0.5em 1em;
  background-color: var(--color-white);
  border-bottom: 1px solid var(--color-light-grey);

  @media (max-width: 680px) {
    grid-template-columns: auto;
    grid-gap: 0.5em;
  }
`;

export const NavContainer = styled.div`
  display: grid;
  align-items: center;
  height: 40px;
  margin-left: 3em;
`;

export const Main = styled.div`
  grid-area: settings-main;
  overflow: auto;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'settings-main-side-nav settings-main-content';
  grid-gap: 2em;
  margin: 2em;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'settings-main-side-nav'
      'settings-main-content';
  }

  @media (max-width: 570px) {
    margin: 2em 1em;
  }
`;

export const SideNav = styled.nav`
  grid-area: settings-main-side-nav;
  width: 280px;

  @media (max-width: 960px) {
    width: 100%;
  }
`;

export const Content = styled.div`
  grid-area: settings-main-content;
`;
