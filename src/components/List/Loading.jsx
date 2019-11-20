import styled, { keyframes } from 'styled-components';

import { ListContainer, ListItem } from './List';

export const LoadingListContainer = styled(ListContainer)`
  box-shadow: 6px 6px 0 0 var(--color-light-grey);
  border-color: var(--color-light-grey);
`;

export const LoadingListItem = styled(ListItem)`
  :hover {
    cursor: wait;
    background-color: var(--color-white);
  }
`;

const glimmer = keyframes`
  0% {
    background-position: -235px 0;
  }
  100% {
    background-position: calc(235px + 100%) 0;
  }
`;

export const LoadingListItemText = styled.span`
  color: transparent;
  background-color: var(--color-light-grey);
  border-radius: var(--radius-size);
  background-repeat: no-repeat;
  background-image: linear-gradient(
    90deg,
    var(--color-light-grey),
    var(--color-lighter-grey),
    var(--color-light-grey)
  );
  background-size: 100% 100%;
  animation: ${glimmer} 1s ease-in-out infinite;
`;
