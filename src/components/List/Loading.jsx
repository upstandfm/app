import styled, { keyframes } from 'styled-components';

import { ListItem } from './List';

export const LoadingListItem = styled(ListItem)`
  :hover {
    cursor: wait;
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
  border-radius: 33px;
  color: transparent;
  background-color: var(--color-light-grey);
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
