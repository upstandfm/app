import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  height: calc(100vh - 55px);
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
  text-align: center;

  position: absolute;
  top: 0.5em;
  left: 0;
  right: 0;

  @media (max-width: 480px) {
    display: grid;
    grid-template-rows: auto auto;
    grid-gap: 0.5em;
    align-items: center;
    justify-items: center;

    position: static;
  }
`;

export const StandupActions = styled.div`
  grid-area: standup-actions;
  text-align: center;
  margin: 1em 0 2em 0;
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
  padding: 1em 0;
  z-index: 1;
`;
