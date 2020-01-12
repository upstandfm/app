import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/Button';

import Loading from './Loading';
import { UserMediaError } from './Errors';

const Container = styled.div`
  padding: 1em 2em;
  background-color: var(--color-white);
  box-shadow: 0px 1px 2px 0px rgba(25, 18, 56, 0.18);
  border-radius: var(--radius-size);
  text-align: center;
`;

const Title = styled.h3`
  margin: 1em 0 0 0;
  font-weight: normal;
`;

const Actions = styled.div`
  margin: 2em 0;
`;

const Info = styled.p`
  margin: 0;
  color: var(--color-grey);
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

      <Actions>
        <Button primary onClick={handleGetPermission}>
          <FontAwesomeIcon icon="microphone" /> Give microphone access
        </Button>
      </Actions>

      <Info>
        <FontAwesomeIcon icon="info-circle" size="sm" /> We&apos;ll <b>only</b>{' '}
        use your microphone to record your update.
      </Info>
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
