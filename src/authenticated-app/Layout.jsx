import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
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
  display: grid;
  grid-template-areas: 'brand actions profile';
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 1fr;
  align-items: center;
  padding: 1em;
  background-color: ${props => props.theme.primaryBackgroundColor};
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

export const Profile = styled.section`
  grid-area: profile;
`;

export const Main = styled.main`
  grid-area: main;
  overflow: auto;
`;

export const Footer = styled.footer`
  grid-area: footer;
  display: none;
  padding: 1em;
  background-color: ${props => props.theme.primaryBackgroundColor};

  @media (max-width: 770px) {
    display: grid;
    justify-items: center;
  }
`;
