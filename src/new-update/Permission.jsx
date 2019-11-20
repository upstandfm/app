import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/Button';

import Loading from './Loading';
import { UserMediaError } from './Errors';

const Container = styled.div`
  padding: 1em 2em;
  background-color: var(--color-lighter-grey);
  border-radius: var(--radius-size);
  text-align: center;
`;

const Title = styled.h2`
  margin: 1em 0 0 0;
  font-weight: normal;
`;

const Actions = styled.div`
  margin: 2em 0 1em 0;
`;

function Permission({ isLoading, err, handleGetPermission }) {
  if (isLoading) {
    return <Loading />;
  }

  if (err) {
    return <UserMediaError err={err} />;
  }

  return (
    <Container>
      <Title>
        We need to <b>temporarily</b> access your microphone to get started.
      </Title>

      <p>
        We&apos;ll <b>only</b> use your microphone to record your update.
      </p>

      <Actions>
        <Button primary onClick={handleGetPermission}>
          <FontAwesomeIcon icon="microphone" /> Give microphone access
        </Button>
      </Actions>
    </Container>
  );
}

Permission.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  err: PropTypes.shape({
    message: PropTypes.string.isRequired
  }),
  handleGetPermission: PropTypes.func.isRequired
};

export default Permission;
