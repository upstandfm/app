import React from 'react';
import PropTypes from 'prop-types';

import { useSnackbar } from '../components/Snackbar';
import { NotFound } from '../components/Errors';

import {
  Container,
  StandupInfo,
  StandupPlayer,
  StandupUpdates
} from './Layout';

import Info, { LoadingInfo } from './Info';
import standupReducer from './reducer';
import useFetchStandup from './use-fetch-standup';

export function PureStandup({ isLoading, standup }) {
  if (isLoading) {
    return (
      <Container>
        {/* TODO: Player skeleton */}

        <StandupInfo>
          <LoadingInfo />
        </StandupInfo>

        {/* TODO: Updates skeleton */}
      </Container>
    );
  }

  if (Object.keys(standup).length === 0) {
    return <NotFound title="Standup not found.." />;
  }

  return (
    <Container>
      <StandupPlayer />

      <StandupInfo>
        <Info standup={standup} />
      </StandupInfo>

      <StandupUpdates />
    </Container>
  );
}

PureStandup.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  standup: PropTypes.object.isRequired
};

function Standup({ standupId }) {
  const [standupState, standupDispatch] = React.useReducer(standupReducer, {});
  const [fetchStandup, abortFetchStandup, isFetching, err] = useFetchStandup(
    standupDispatch
  );

  const [, snackbarDispatch] = useSnackbar();

  React.useEffect(() => {
    fetchStandup(standupId);

    return () => {
      abortFetchStandup();
    };
  }, [standupId]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!err) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to fetch standup',
        text: err.details
          ? `${err.message}: ${err.details}.`
          : err.message + '.'
      }
    });
  }, [err]); // eslint-disable-line react-hooks/exhaustive-deps

  return <PureStandup isLoading={isFetching} standup={standupState} />;
}

Standup.propTypes = {
  standupId: PropTypes.string
};

export default Standup;
