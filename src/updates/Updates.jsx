import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

import Button from '../components/Button';
import { useSnackbar } from '../components/Snackbar';
import { useAudioPlayer } from '../components/AudioPlayer';

import { Container, Actions, Main, Subtitle, LoadingSubtitle } from './Layout';
import UserRecordings, { LoadingUserRecordings } from './UserRecordings';

import updatesReducer from './reducer';
import useFetchUpdates from './use-fetch-updates';
import { sortDateKeysDescending, formatDate, isDateToday } from './utils';

export function LoadingUpdates() {
  return (
    <Container>
      <Actions>
        <Button as={Link} to="new-update">
          New update
        </Button>
      </Actions>

      <Main>
        <LoadingSubtitle>Loading date</LoadingSubtitle>
        <LoadingUserRecordings />
      </Main>
    </Container>
  );
}

export function PureUpdates({
  isLoading,
  updates,
  playPauseAudio,
  playingFileId,
  audioPlayerIsPlaying
}) {
  if (isLoading) {
    return (
      <>
        <LoadingSubtitle>Loading date</LoadingSubtitle>
        <LoadingUserRecordings />
      </>
    );
  }

  const dateKeys = Object.keys(updates);
  const sortedDateKeys = sortDateKeysDescending(dateKeys);

  return sortedDateKeys.map(data => {
    const { epoch, dateKey } = data;
    const formattedDate = formatDate(epoch);
    const isToday = isDateToday(epoch);

    return (
      <div key={epoch}>
        <Subtitle isToday={isToday}>{formattedDate}</Subtitle>
        <UserRecordings
          recordings={updates[dateKey]}
          playPauseAudio={playPauseAudio}
          playingFileId={playingFileId}
          audioPlayerIsPlaying={audioPlayerIsPlaying}
        />
      </div>
    );
  });
}

PureUpdates.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  updates: PropTypes.object.isRequired,
  playPauseAudio: PropTypes.func.isRequired,
  playingFileId: PropTypes.string,
  audioPlayerIsPlaying: PropTypes.bool.isRequired
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

  const [audioPlayerState, audioPlayerDispatch] = useAudioPlayer();

  const playPauseAudio = (recordingId, fileKey) => {
    const isPlayingCurrentRecording =
      recordingId === audioPlayerState.playingFile.fileId;

    if (audioPlayerState.isPlaying && isPlayingCurrentRecording) {
      audioPlayerDispatch({
        type: 'PAUSE_AUDIO',
        data: {}
      });
    } else {
      audioPlayerDispatch({
        type: 'PLAY_AUDIO',
        data: {
          playingFile: {
            fileId: recordingId,
            fileKey
          }
        }
      });
    }
  };

  return (
    <Container>
      <Actions>
        <Button as={Link} to="new-update">
          New update
        </Button>
      </Actions>

      <Main>
        <PureUpdates
          isLoading={isFetching}
          updates={updatesState}
          playPauseAudio={playPauseAudio}
          playingFileId={audioPlayerState.playingFile.fileId}
          audioPlayerIsPlaying={audioPlayerState.isPlaying}
        />
      </Main>
    </Container>
  );
}

Updates.propTypes = {
  standupId: PropTypes.string.isRequired
};

export default Updates;
