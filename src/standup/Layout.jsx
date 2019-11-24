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
    height: calc(100vh - 72px);
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'standup-info'
      'standup-updates'
      'standup-player';
  }

  @media (max-width: 570px) {
    height: calc(100vh - 112px);
  }
`;

export const StandupPlayer = styled.div`
  grid-area: standup-player;
  display: grid;
  justify-items: center;
  box-shadow: 0 3px 3px -3px rgba(0, 0, 0, 0.2);
  margin: 00;
  padding: 1em 0;
  width: 100%;
  z-index: 1;

  @media (max-width: 770px) {
    box-shadow: 0 -3px 3px -3px rgba(0, 0, 0, 0.2);
  }
`;

export const StandupInfo = styled.div`
  grid-area: standup-info;

  @media (max-width: 770px) {
    box-shadow: 0 3px 3px -3px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
`;

export const StandupUpdates = styled.div`
  grid-area: standup-updates;
  overflow: auto;
`;
