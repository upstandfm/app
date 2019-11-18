import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  padding: 1em 2em;
  text-align: center;
  background-color: var(--color-lighter-grey);
`;

const Text = styled.p`
  margin: 1em 0;
`;

function Loading() {
  return (
    <Container>
      <Text>
        <FontAwesomeIcon icon="circle-notch" spin /> Getting permission..
      </Text>
    </Container>
  );
}

export default Loading;
