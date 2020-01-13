import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  display: grid;
  height: 100vh;
`;

const Splash = styled.div`
  margin: auto;
  text-align: center;
`;

const Text = styled.h3`
  font-weight: normal;
`;

function SplashScreen() {
  return (
    <Container>
      <Splash>
        <Text>
          <FontAwesomeIcon icon="circle-notch" spin /> Loading app..
        </Text>
      </Splash>
    </Container>
  );
}

export default SplashScreen;
