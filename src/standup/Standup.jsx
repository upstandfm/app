import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import AudioPlayer, { LoadingAudioPlayer } from '../components/AudioPlayer';
import { useSnackbar } from '../components/Snackbar';
import { NotFound } from '../components/Errors';
import Button from '../components/Button';

import Updates, { LoadingUpdates } from '../updates';
import StandupMembers, {
  LoadingStandupMembers,
  StandupMembersProvider
} from '../standup-members';

import {
  Container,
  StandupInfo,
  StandupActions,
  StandupUpdates,
  StandupPlayer
} from './Layout';

import Info, { LoadingInfo } from './Info';
import standupReducer from './reducer';
import useFetchStandup from './use-fetch-standup';

export function PureStandup({ isLoading, standup }) {
  if (isLoading) {
    return (
      <Container>
        <StandupInfo>
          <LoadingInfo />
          <LoadingStandupMembers />
        </StandupInfo>

        <StandupActions>
          <Button as={Link} to="new-update">
            New update
          </Button>
        </StandupActions>

        <StandupUpdates>
          <LoadingUpdates />
        </StandupUpdates>

        <StandupPlayer>
          <LoadingAudioPlayer />
        </StandupPlayer>
      </Container>
    );
  }

  if (Object.keys(standup).length === 0) {
    return (
      <NotFound
        title="Standup not found"
        info="You might not be a member of this standup."
      />
    );
  }

  return (
    <Container>
      <StandupInfo>
        <Info standup={standup} />
        <StandupMembers standupId={standup.standupId} />
      </StandupInfo>

      <StandupActions>
        <Button as={Link} to="new-update">
          New update
        </Button>
      </StandupActions>

      <StandupUpdates>
        <Updates standupId={standup.standupId} />
      </StandupUpdates>

      <StandupPlayer>
        <AudioPlayer />
      </StandupPlayer>
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

  return (
    <StandupMembersProvider>
      <PureStandup isLoading={isFetching} standup={standupState} />
    </StandupMembersProvider>
  );
}

Standup.propTypes = {
  standupId: PropTypes.string
};

export default Standup;
