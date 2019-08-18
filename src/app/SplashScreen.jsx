import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  height: 100vh;
  background-color: ${props => props.theme.primaryBackgroundColor};
`;

const Splash = styled.div`
  margin: auto;
`;

const Text = styled.h1`
  text-transform: capitalize;
  color: ${props => props.theme.primaryColor};
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
