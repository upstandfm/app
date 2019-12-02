import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  height: calc(100vh - 55px);
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'standup-info'
    'standup-updates'
    'standup-player';
`;

export const StandupInfo = styled.div`
  grid-area: standup-info;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 1em;
  align-items: center;
  justify-items: center;
`;

export const StandupUpdates = styled.div`
  grid-area: standup-updates;
  overflow: auto;
`;

export const StandupPlayer = styled.div`
  grid-area: standup-player;
  display: grid;
  justify-items: center;
  box-shadow: 0 -3px 3px -3px rgba(0, 0, 0, 0.2);
  background-color: var(--color-white);
  margin: 0;
  padding: 1em 0;
  width: 100%;
  z-index: 1;
`;
