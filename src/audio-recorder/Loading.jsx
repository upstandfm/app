import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  margin: 2em 0 1em 0;
  text-align: center;
`;

const Text = styled.p`
  margin: 0.25em 0;
`;

function Loading() {
  return (
    <Container>
      <FontAwesomeIcon icon="circle-notch" size="lg" spin />
      <Text>Getting permission..</Text>
    </Container>
  );
}

export default Loading;
