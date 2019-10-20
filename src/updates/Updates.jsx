import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import Button from '../components/Button';
import { useSnackbar } from '../components/Snackbar';

import { Container, Actions, Main } from './Layout';
import Recordings from './Recordings';

import updatesReducer from './reducer';
import useFetchUpdates from './use-fetch-updates';
import { sortDateKeysDescending } from './utils';

export function PureUpdates({ isLoading, updates }) {
  if (isLoading) {
    return <div>loading..</div>;
  }

  if (updates.length === 0) {
    return <div>no updates</div>;
  }

  const dateKeys = Object.keys(updates);
  const sortedDateKeys = sortDateKeysDescending(dateKeys);

  return (
    <Main>
      {sortedDateKeys.map(data => {
        const { dateKey } = data;
        const recordings = updates[dateKey];

        return (
          <Recordings key={dateKey} dateKey={dateKey} recordings={recordings} />
        );
      })}
    </Main>
  );
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
