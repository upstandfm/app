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
  font-size: 24px;
  color: ${props => props.theme.textColor};

  a {
    font-weight: bold;
    color: ${props => props.theme.primaryColor};

    :visited {
      color: ${props => props.theme.primaryColor};
    }
  }

  p {
    line-height: 1.6;
  }

  @media (max-width: 1000px) {
    grid-template-areas:
      'menubar menubar'
      'main    main';
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  @media (max-width: 550px) {
    font-size: 20px;
  }
`;

export const MenuBar = styled.div`
  grid-area: menubar;
  display: grid;
  grid-template-areas:
    'profile'
    'menu'
    'misc';
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-gap: 1.5em;
  align-items: center;
  margin: 0;
  padding: 1em 0;
  background-color: ${props => props.theme.primaryBackgroundColor};
  border-right: 1px solid ${props => props.theme.accentColor};

  @media (max-width: 1000px) {
    grid-template-areas: 'profile menu misc';
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr;
    border-right: none;
    border-bottom: 1px solid ${props => props.theme.accentColor};
  }

  @media (max-width: 550px) {
    grid-template-areas:
      'profile'
      'menu'
      'misc';
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

export const Misc = styled.section`
  grid-area: misc;
  padding: 0 1em;
`;

export const Main = styled.main`
  grid-area: main;
  overflow: auto;
`;
