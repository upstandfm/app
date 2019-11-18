import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  height: calc(100vh - 72px);
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'standup-player standup-player'
    'standup-info   standup-updates';

  @media (max-width: 770px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr;
    grid-template-areas:
      'standup-player'
      'standup-info'
      'standup-updates';
  }

  @media (max-width: 570px) {
    height: calc(100vh - 112px);
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'standup-info'
      'standup-updates'
      'standup-player';
  }
`;

export const StandupPlayer = styled.div`
  grid-area: standup-player;
  display: grid;
  justify-items: center;
  border-bottom: 1px solid var(--color-light-grey);
  margin: 0 0 1em 0;
  padding: 1em 0;
  width: 100%;

  @media (max-width: 570px) {
    border-top: 1px solid var(--color-lighter-grey);
    border-bottom: none;
    margin: 1em 0 0 0;
  }
`;

export const StandupInfo = styled.div`
  grid-area: standup-info;
`;

export const StandupUpdates = styled.div`
  grid-area: standup-updates;
`;
