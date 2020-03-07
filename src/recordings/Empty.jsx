import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  padding: 1em 2em;
  text-align: center;
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
