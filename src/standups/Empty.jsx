import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  display: grid;
`;

const Wrapper = styled.div`
  margin: 1em auto;
  padding: 1em;
`;

const Title = styled.h2`
  margin: 0.5em 0 0.25em 0;
`;

function Empty({ title, children }) {
  return (
    <Container>
      <Wrapper>
        <Title>
          <FontAwesomeIcon icon="info-circle" /> {title}
        </Title>
      </Wrapper>
    </Container>
  );
}

export default Empty;
