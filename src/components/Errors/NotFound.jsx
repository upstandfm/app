import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import Button from '../Button';

const Container = styled.div`
  display: grid;
  background-color: var(--color-white);
  border: 1px solid var(--color-light-grey);
  border-radius: var(--radius-size);
  margin: 2em;
`;

const Wrapper = styled.div`
  margin: 1em auto;
  padding: 1em;
  text-align: center;
`;

const Title = styled.h2`
  margin: 0.5em 0 0.25em 0;
  color: var(--color-dark-grey);
`;

const Actions = styled.div`
  margin: 2em 0 0 0;
`;

const NotFound = function({ title, info }) {
  return (
    <Container>
      <Wrapper>
        <Title>
          <FontAwesomeIcon icon="lightbulb" size="sm" /> {title}
        </Title>

        {info && <p>{info}</p>}

        <Actions>
          <Button as={Link} to="/">
            Go back home
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
