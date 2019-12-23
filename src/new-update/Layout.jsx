import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  height: calc(100vh - 55px);
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'new-standup-header'
    'new-standup-main'
    'new-standup-player';
`;

export const Header = styled.div`
  grid-area: new-standup-header;
  text-align: center;
  position: absolute;
  top: 0.5em;
  left: 0;
  right: 0;

  @media (max-width: 480px) {
    position: static;
  }
`;

export const Main = styled.div`
  grid-area: new-standup-main;
  display: grid;
`;

export const Wrapper = styled.div`
  margin: auto;
  padding: 1em;
`;

export const Player = styled.div`
  grid-area: new-standup-player;
  box-shadow: 0 -3px 3px -3px rgba(0, 0, 0, 0.2);
  background-color: var(--color-white);
  margin: 0;
  padding: 1em 0;
  z-index: 1;
`;

export const Actions = styled.div`
  display: grid;
  justify-items: left;
  margin: 2em 0 0 0;

  @media (max-width: 470px) {
    justify-items: center;
  }
`;

export const Preview = styled.div`
  width: 100%;
  justify-self: end;

  @media (max-width: 760px) {
    justify-self: center;
  }

  @media (max-width: 350px) {
    width: 100%;
  }
`;
