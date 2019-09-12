import React from 'react';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import Button from '../Button';

const Container = styled.div`
  display: grid;
`;

const Wrapper = styled.div`
  margin: 1em auto;
  padding: 1em;
  text-align: center;
`;

const Title = styled.h2`
  margin: 0.5em 0 0.25em 0;
`;

const Actions = styled.div`
  margin: 2em 0 0 0;
`;

const NotFound = function() {
  return (
    <Container>
      <Wrapper>
        <Title>
          <FontAwesomeIcon icon="info-circle" /> Page not found
        </Title>

        <p>Sorry! This page doesn't exist.</p>

        <Actions>
          <Button as={Link} to="/">
            Back to home
          </Button>
        </Actions>
      </Wrapper>
    </Container>
  );
};

export default NotFound;
