import React from 'react';
import styled from 'styled-components';

import { Skeleton } from '../Loading';

import { Trigger, WorkspaceName } from './Layout';

const Container = styled.div`
  font-size: 1em;
  line-height: 1;
`;

export default function Loading() {
  return (
    <Container>
      <Trigger>
        <Skeleton as={WorkspaceName}>Loading workspace</Skeleton>
      </Trigger>
    </Container>
  );
}
