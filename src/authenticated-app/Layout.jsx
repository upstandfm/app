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

  @media (max-width: 770px) {
    grid-template-areas:
      'header'
      'main'
      'footer';
    grid-template-rows: auto 1fr auto;
  }
`;

export const Header = styled.header`
  grid-area: header;
  padding: 1em;
  background-color: var(--color-dark-purple);
`;

export const HeaderContainer = styled.div`
  max-width: 75rem;
  margin: 0 auto;
  display: grid;
  grid-template-areas: 'brand actions profile';
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 1fr;
  align-items: center;
`;

export const Brand = styled.div`
  grid-area: brand;
`;

export const Actions = styled.div`
  grid-area: actions;
  display: grid;
  justify-items: center;

  @media (max-width: 770px) {
    display: none;
  }
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

export const Footer = styled.footer`
  grid-area: footer;
  display: none;
  padding: 1em;
  background-color: transparent;

  @media (max-width: 770px) {
    display: grid;
    justify-items: end;
  }
`;
