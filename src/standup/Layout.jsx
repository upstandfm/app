import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto 1fr auto;
  grid-template-areas:
    'standup-info'
    'standup-actions'
    'standup-updates'
    'standup-player';
`;

export const StandupInfo = styled.div`
  grid-area: standup-info;
  padding: 0.25em 0;
  text-align: center;

  @media (max-width: 480px) {
    display: grid;
    grid-template-rows: auto auto;
    grid-gap: 0.5em;
    align-items: center;
    justify-items: center;
  }
`;

export const StandupActions = styled.div`
  grid-area: standup-actions;
  text-align: center;
  margin: 0.5em 0 1em 0;
`;

export const StandupUpdates = styled.div`
  grid-area: standup-updates;
  overflow: auto;
`;

export const StandupPlayer = styled.div`
  grid-area: standup-player;
  box-shadow: 0 -3px 3px -3px rgba(0, 0, 0, 0.2);
  background-color: var(--color-white);
  margin: 0;
  padding: 1em;
  z-index: 1;
`;
