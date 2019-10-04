import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/Button';

import Loading from './Loading';
import { UserMediaError } from './Errors';

const Container = styled.div`
  padding: 1em;
  background-color: var(--color-lightest-purple);
  border-radius: 8px;
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
        To get started, we need <b>temporary</b> access to your microphone.
      </Title>

      <p>We&apos;ll use your microphone to record your update.</p>

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