import styled from 'styled-components';

import { List, ListTitle, ListItemText } from '../components/List';

export const Container = styled.div`
  display: grid;
  height: calc(100vh - 56px - 98px);
`;

export const Wrapper = styled.div`
  margin: auto;
  padding: 1em;
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

export const Actions = styled.div`
  display: grid;
  justify-items: left;
  margin: 2em 0 0 0;

  @media (max-width: 470px) {
    justify-items: center;
  }
`;

export const RecordingsList = styled(List)`
  padding: 0;
  overflow: auto;
  height: 258px;
`;

export const RecordingListTitle = styled(ListTitle)`
  padding: 1em;
`;

export const RecordingName = styled(ListItemText)`
  max-width: 240px;
  display: inline-block;
  box-sizing: border-box;
`;

export const UploadRecordingName = styled(RecordingName)`
  font-weight: bold;
  max-width: 325px;
`;
