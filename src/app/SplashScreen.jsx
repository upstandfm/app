import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  height: 100vh;
  background-color: ${props => props.theme.primaryBackgroundColor};
  color: ${props => props.theme.primaryForegroundColor};
`;

const Splash = styled.div`
  margin: auto;
`;

const Text = styled.h2`
  text-transform: capitalize;
  font-weight: normal;
`;

function SplashScreen() {
  return (
    <Container>
      <Splash>
        <Text>loading app..</Text>
      </Splash>
    </Container>
  );
}

export default SplashScreen;
