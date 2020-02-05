import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  height: 100%;
  padding: 0 1em;
`;

const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 30rem;
  margin: auto;
  padding: 1em;
  text-align: center;
  background-color: var(--color-white);
  border-radius: var(--radius-size);
  box-shadow: 0px 1px 2px 0px rgba(25, 18, 56, 0.18);
`;

const Title = styled.h2`
  margin: 0.5em 0 0.25em 0;
`;

const ErrMessage = styled.p`
  color: var(--color-dark-red);
  font-weight: bold;
`;

const FetchError = function({ err }) {
  return (
    <Container>
      <Wrapper>
        <Title>Failed to fetch workspace data</Title>
        <p>Oops! Something went wrong on our end. We got back this error:</p>

        <ErrMessage>{err.message}</ErrMessage>

        <p>Please try again by refreshing the page.</p>
      </Wrapper>
    </Container>
  );
};

FetchError.propTypes = {
  err: PropTypes.object
};

export default FetchError;
