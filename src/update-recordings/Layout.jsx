import styled from 'styled-components';

import { ListContainer, List } from '../components/List';

export const Container = styled(ListContainer)`
  margin: 3em 1em 2em 1em;
`;

export const RecordingsList = styled(List)`
  margin-left: 32px;
  margin-bottom: 2em;
  padding: 0;
  border-left: 1px solid var(--color-light-grey);

  :last-child {
    margin-bottom: 0;
  }
`;
