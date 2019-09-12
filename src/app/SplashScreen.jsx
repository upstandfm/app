import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  display: grid;
  height: 100vh;
  background-color: var(--color-darkest-purple);
  color: var(--color-white);
`;

const Splash = styled.div`
  margin: auto;
  text-align: center;
`;

const Text = styled.h2``;

function SplashScreen() {
  return (
    <Container>
      <Splash>
        <FontAwesomeIcon icon="circle-notch" size="3x" spin />

        <Text data-cy="loading">Loading App..</Text>
      </Splash>
    </Container>
  );
}

export default SplashScreen;
