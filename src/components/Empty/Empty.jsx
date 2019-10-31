import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  display: grid;
  background-color: var(--color-lightest-grey);
  border-radius: 8px;
  margin: 1em 0;
`;

const Wrapper = styled.div`
  margin: 1em auto;
  padding: 1em;
  text-align: center;
`;

const Title = styled.h3`
  margin: 0.5em 0 0.25em 0;
  font-weight: normal;
  color: var(--color-dark-grey);
`;

function Empty({ title }) {
  return (
    <Container>
      <Wrapper>
        <Title>
          <FontAwesomeIcon icon="lightbulb" size="sm" /> {title}
        </Title>
      </Wrapper>
    </Container>
  );
}

Empty.propTypes = {
  title: PropTypes.string
};

export default Empty;
