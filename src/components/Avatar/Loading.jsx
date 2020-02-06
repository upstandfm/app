import styled from 'styled-components';

import { AvatarContainer } from './Avatar';

export const LoadingAvatar = styled(AvatarContainer)`
  background-color: var(--color-light-grey);

  :hover {
    cursor: wait;
  }
`;

LoadingAvatar.defaultProps = {
  size: '32px'
};
