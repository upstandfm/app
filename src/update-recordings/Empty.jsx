import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  margin: 1.5em 0;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 1em 2em;
  text-align: center;
  box-shadow: 0px 2px 4px rgba(25, 18, 56, 0.14);
  background-color: var(--color-white);
  border-radius: var(--radius-size);
`;

const Title = styled.h4`
  margin: 0;
  font-weight: normal;
  color: var(--color-grey);
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
