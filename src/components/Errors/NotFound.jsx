import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../Button';

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
  box-shadow: 0px 1px 2px 0px rgba(25, 18, 56, 0.18);
  border-radius: var(--radius-size);
`;

const Title = styled.h2`
  margin: 0.5em 0 0.25em 0;
  color: var(--color-dark-grey);
`;

const Actions = styled.div`
  margin: 2em 0 1em 0;
`;

const NotFound = function({ title, info }) {
  return (
    <Container>
      <Wrapper>
        <Title>{title}</Title>

        {info && <p>{info}</p>}

        <Actions>
          <Button as={Link} to="/">
            <FontAwesomeIcon icon="home" size="sm" /> Back home
          </Button>
        </Actions>
      </Wrapper>
    </Container>
  );
};

NotFound.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.string
};

export default NotFound;
