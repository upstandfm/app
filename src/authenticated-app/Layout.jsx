import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-areas:
    'menubar main'
    'menubar main';
  grid-template-columns: 250px 1fr;
  grid-template-rows: 1fr;

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
    'brand'
    'actions'
    'profile';
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-gap: 1em;
  align-items: center;
  padding: 2em 0;

  @media (max-width: 1000px) {
    grid-template-areas: 'brand actions profile';
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr;
    padding: 1em 0;
  }

  @media (max-width: 550px) {
    grid-template-areas:
      'brand   profile'
      'actions actions';
    grid-template-columns: 1fr auto;
    grid-template-rows: 1fr 1fr;
  }

  background-color: lightpink;
`;

export const Brand = styled.section`
  grid-area: brand;
  padding: 0 1em;
`;

export const Actions = styled.section`
  grid-area: actions;
  margin: 0 auto;
`;

export const Profile = styled.section`
  grid-area: profile;
  padding: 0 1em;
`;

export const Main = styled.main`
  grid-area: main;
  overflow: auto;
`;