import React from 'react';
import styled, { keyframes } from 'styled-components';

import { Trigger, WorkspaceName } from './Layout';

const glimmer = keyframes`
  0% {
    background-position: -235px 0;
  }
  100% {
    background-position: calc(235px + 100%) 0;
  }
`;

const Container = styled.div`
  font-size: 1em;
  line-height: 1;
`;

const Loading = styled(WorkspaceName)`
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

export default function LoadingWorkspace() {
  return (
    <Container>
      <Trigger>
        <Loading>A loading title</Loading>
      </Trigger>
    </Container>
  );
}
