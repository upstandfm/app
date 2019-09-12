import styled from 'styled-components';

export const AppContainer = styled.div`
  height: 100vh;
  height: -webkit-fill-available;
  display: grid;
  grid-template-areas:
    'header'
    'main';
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
`;

export const Header = styled.header`
  grid-area: header;
  padding: 16px;
  background-color: var(--color-darkest-purple);
`;

export const HeaderContainer = styled.div`
  max-width: 75rem;
  height: 40px;
  margin: 0 auto;
  display: grid;
  grid-template-areas: 'brand nav profile';
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 1fr;
  grid-gap: 8em;
  align-items: center;

  @media (max-width: 570px) {
    grid-template-areas:
      'brand profile'
      'nav   nav';
    grid-template-columns: 1fr auto;
    grid-template-rows: auto auto;
    grid-gap: 1em;
    height: auto;
  }
`;

export const Brand = styled.div`
  grid-area: brand;
`;

export const Nav = styled.nav`
  grid-area: nav;
  display: grid;
  align-items: center;
`;

export const Profile = styled.div`
  grid-area: profile;
`;

export const Main = styled.main`
  grid-area: main;
  overflow: auto;
`;

export const MainContainer = styled.div`
  max-width: 75rem;
  margin: 0 auto;
`;
