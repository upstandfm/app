import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import styled from 'styled-components';

import Button from '../components/Button';
import { useSnackbar } from '../components/Snackbar';

import updatesReducer from './reducer';
import useFetchUpdates from './use-fetch-updates';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 1em;
  align-items: center;
  padding: 1em;
`;

const Actions = styled.div`
  display: grid;
  justify-items: end;
  padding: 2em 0;

  @media (max-width: 470px) {
    justify-items: center;
    padding: 1em 0;
  }
`;

const Main = styled.div``;

export function PureUpdates({ isLoading, updates }) {
  if (isLoading) {
    return <div>loading..</div>;
  }

  if (updates.length === 0) {
    return <div>no updates</div>;
  }

  return <Main />;
}

PureUpdates.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  updates: PropTypes.object.isRequired
};

function Updates({ standupId }) {
  const [updatesState, updatesDispatch] = React.useReducer(updatesReducer, {});
  const [fetchUpdates, abortFetchUpdates, isFetching, err] = useFetchUpdates(
    updatesDispatch
  );

  const [, snackbarDispatch] = useSnackbar();

  React.useEffect(() => {
    fetchUpdates(standupId);

    return () => {
      abortFetchUpdates();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!err) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to fetch updates',
        text: err.details
          ? `${err.message}: ${err.details}.`
          : err.message + '.'
      }
    });
  }, [err]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Actions>
        <Button as={Link} to="new-update">
          New update
        </Button>
      </Actions>

      <PureUpdates isLoading={isFetching} updates={updatesState} />
    </Container>
  );
}

Updates.propTypes = {
  standupId: PropTypes.string.isRequired
};

export default Updates;
