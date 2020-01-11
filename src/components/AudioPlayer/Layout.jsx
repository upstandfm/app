import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-areas: 'player-controls player-main';
  grid-template-columns: auto 1fr;
  grid-gap: 0.75em;
  align-items: center;
  justify-items: center;
  max-width: 50rem;
  margin: 0 auto;
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

export const Title = styled.h4`
  margin: 0;
  height: 22px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: normal;
`;
