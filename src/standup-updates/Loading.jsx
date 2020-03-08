import React from 'react';

import { LoadingRecordings } from '../recordings';

import { Wrapper, Container } from './Layout';

function Loading() {
  return (
    <Wrapper>
      <Container>
        <LoadingRecordings />
      </Container>
    </Wrapper>
  );
}

export default Loading;
