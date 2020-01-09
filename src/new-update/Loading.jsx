import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  padding: 1em 2em;
  text-align: center;
  background-color: var(--color-white);
  box-shadow: 0px 2px 4px rgba(25, 18, 56, 0.18);
  border-radius: var(--radius-size);
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
