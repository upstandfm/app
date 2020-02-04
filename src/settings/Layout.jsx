import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.div`
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

export const Wrapper = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 56px);
  overflow: auto;
  padding: 1.5em 1em;
`;

export const Main = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-areas: 'settings-main-side-nav settings-main-content';
  grid-gap: 2em;
  max-width: 70rem;
  margin: 0 auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      'settings-main-side-nav'
      'settings-main-content';
  }
`;

export const SideNav = styled.nav`
  grid-area: settings-main-side-nav;
  width: 240px;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

export const Content = styled.div`
  grid-area: settings-main-content;
`;
