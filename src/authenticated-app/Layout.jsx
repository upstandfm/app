import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-areas:
    'menubar main'
    'menubar main';
  grid-template-columns: 220px 1fr;
  grid-template-rows: 1fr;
  font-family: 'Open Sans', sans-serif;
  color: ${props => props.theme.textColor};

  a {
    color: ${props => props.theme.primaryColor};

    :visited {
      color: ${props => props.theme.primaryColor};
    }
  }

  p {
    font-size: 20px;
    line-height: 1.6;
  }

  code {
    font-family: Fira Code, Source Code Pro, Menlo, Monaco, monospace;
  }

  @media (max-width: 1000px) {
    grid-template-areas:
      'menubar menubar'
      'main    main';
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
`;

export const MenuBar = styled.div`
  grid-area: menubar;
  display: grid;
  grid-template-areas:
    'profile'
    'menu'
    'footer';
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-gap: 1.5em;
  align-items: center;
  margin: 0;
  padding: 1em 0;
  background-color: ${props => props.theme.primaryBackgroundColor};

  @media (max-width: 1000px) {
    grid-template-areas: 'profile menu footer';
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr;
  }

  @media (max-width: 550px) {
    grid-template-areas:
      'profile'
      'menu'
      'footer';
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }
`;

export const Profile = styled.section`
  grid-area: profile;
  padding: 0 1em;
`;

export const Menu = styled.section`
  grid-area: menu;
  margin: 0 auto;
  padding: 0 1em;
`;

export const Footer = styled.section`
  grid-area: footer;
  padding: 0 1em;
`;

export const Main = styled.main`
  grid-area: main;
  overflow: auto;
`;
