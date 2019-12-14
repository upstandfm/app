import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  margin: 3em 0 2em 0;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 1em 2em;
  text-align: center;
  background-color: var(--color-lightest-purple);
  border-radius: var(--radius-size);
`;

const Title = styled.h4`
  margin: 0;
  font-weight: normal;
  color: var(--color-dark-grey);
`;

function Empty({ title }) {
  return (
    <Container>
      <Wrapper>
        <Title>{title}</Title>
      </Wrapper>
    </Container>
  );
}

Empty.propTypes = {
  title: PropTypes.string
};

export default Empty;
