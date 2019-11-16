import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-areas: 'player-controls player-main player-meta';
  grid-template-columns: auto 1fr auto;
  grid-gap: 1em;
  align-items: center;
  justify-items: center;
  width: 70%;
`;

export const Controls = styled.div`
  grid-area: player-controls;
`;

export const Main = styled.div`
  grid-area: player-main;
  display: grid;
  grid-template-rows: auto auto auto;
  grid-gap: 0.5em;
  align-items: center;
  justify-items: center;
  width: 100%;
`;

export const PlayState = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  width: 40px;
  height: 40px;
`;

export const Title = styled.h4`
  margin: 0;
  height: 22px;
  text-align: center;
  text-transform: capitalize;
`;

export const Meta = styled.div`
  grid-area: player-meta;
`;
