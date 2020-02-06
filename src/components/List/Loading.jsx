import styled from 'styled-components';

import { ListItem } from './List';

export const LoadingListItem = styled(ListItem)`
  :hover {
    cursor: wait;
    background-color: transparent;

    :nth-child(2n) {
      background-color: #fafafa;
    }
  }
`;
