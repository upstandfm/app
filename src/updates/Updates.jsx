import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/Button';
import { useSnackbar } from '../components/Snackbar';
import { useAudioPlayer } from '../components/AudioPlayer';

import {
  Container,
  Actions,
  Main,
  Subtitle,
  LoadingSubtitle,
  UpdatesContainer,
  LoadMoreContainer
} from './Layout';

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
  isLoadingMore,
  updates,
  audioPlayerState,
  playPauseAudio,
  fetchMoreUpdates
}) {
  if (isLoading && !isLoadingMore) {
    return (
      <>
        <LoadingSubtitle>Loading date</LoadingSubtitle>
        <LoadingUserRecordings />
      </>
    );
  }

  const handleLoadMore = () => {
    fetchMoreUpdates();
  };

  const dateKeys = Object.keys(updates);
  const sortedDateKeys = sortDateKeysDescending(dateKeys);

  return (
    <>
      {sortedDateKeys.map(data => {
        const { epoch, dateKey } = data;
        const formattedDate = formatDate(epoch);
        const isToday = isDateToday(epoch);

        return (
          <UpdatesContainer key={epoch}>
            <Subtitle isToday={isToday}>{formattedDate}</Subtitle>
            <UserRecordings
              recordings={updates[dateKey]}
              playPauseAudio={playPauseAudio}
              audioPlayerState={audioPlayerState}
            />
          </UpdatesContainer>
        );
      })}

      <LoadMoreContainer>
        <Button tertiary disabled={isLoadingMore} onClick={handleLoadMore}>
          {isLoadingMore ? (
            <>
              <FontAwesomeIcon icon="circle-notch" size="sm" spin /> Loading..
            </>
          ) : (
            'Load older updates'
          )}
        </Button>
      </LoadMoreContainer>
    </>
  );
}

PureUpdates.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  updates: PropTypes.object.isRequired,
  audioPlayerState: PropTypes.object.isRequired,
  playPauseAudio: PropTypes.func.isRequired
};

function Updates({ standupId }) {
  const [updatesState, updatesDispatch] = React.useReducer(updatesReducer, {});
  const [fetchUpdates, abortFetchUpdates, isFetching, err] = useFetchUpdates(
    updatesDispatch
  );

  const [dayOffset, setDayOffset] = React.useState(0);

  React.useEffect(() => {
    fetchUpdates(standupId).then(() => setDayOffset(s => s + 1));

    return () => {
      abortFetchUpdates();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [, snackbarDispatch] = useSnackbar();
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

  const fetchMoreUpdates = () => {
    const today = new Date();
    const year = today.getFullYear();
    const monthIndex = today.getMonth();
    const day = today.getDate();

    const pastDate = new Date(year, monthIndex, day - dayOffset);
    const pastDateDay = pastDate.getDate();
    const pastDateMonthIndex = pastDate.getMonth();
    const pastDateYear = pastDate.getFullYear();
    const dateKey = `${pastDateDay}-${pastDateMonthIndex + 1}-${pastDateYear}`;

    fetchUpdates(standupId, dateKey).then(() => setDayOffset(s => s + 1));
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
          isLoadingMore={isFetching && dayOffset > 0}
          updates={updatesState}
          audioPlayerState={audioPlayerState}
          playPauseAudio={playPauseAudio}
          fetchMoreUpdates={fetchMoreUpdates}
        />
      </Main>
    </Container>
  );
}

Updates.propTypes = {
  standupId: PropTypes.string.isRequired
};

export default Updates;
