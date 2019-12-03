import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/Button';
import { useSnackbar } from '../components/Snackbar';
import { useAudioPlayer } from '../components/AudioPlayer';
import { useStandupMembers } from '../standup-members';

import {
  Container,
  DayDivider,
  Day,
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
      <LoadingSubtitle>Loading date</LoadingSubtitle>
      <LoadingUserRecordings />
    </Container>
  );
}

export function PureUpdates({
  isLoading,
  isLoadingMore,
  updates,
  members,
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
            <DayDivider>
              <Day
                formattedDate={isToday ? 'Today' : formattedDate}
                showHelp={isToday}
                title={isToday ? formattedDate : ''}
              />
            </DayDivider>

            <UserRecordings
              members={members}
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
            <FontAwesomeIcon icon="circle-notch" spin />
          ) : (
            'Load older'
          )}
        </Button>
      </LoadMoreContainer>
    </>
  );
}

PureUpdates.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  updates: PropTypes.object.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.string.isRequired,
      userFullName: PropTypes.string,
      avatarUrl: PropTypes.string
    })
  ),
  audioPlayerState: PropTypes.object.isRequired,
  playPauseAudio: PropTypes.func.isRequired
};

function Updates({ standupId }) {
  const [updatesState, updatesDispatch] = React.useReducer(updatesReducer, {});
  const [
    fetchUpdates,
    abortFetchUpdates,
    isFetching,
    err,
    dayOffset
  ] = useFetchUpdates(updatesDispatch);
  const [membersState] = useStandupMembers();

  React.useEffect(() => {
    fetchUpdates(standupId);

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

  const playPauseAudio = (recordingId, fileKey, fileTitle) => {
    const loadedFile = recordingId === audioPlayerState.playingFile.fileId;
    if (!loadedFile) {
      audioPlayerDispatch({
        type: 'LOAD_AND_PLAY_AUDIO_FILE',
        data: {
          fileId: recordingId,
          fileKey,
          fileTitle
        }
      });
    } else {
      audioPlayerDispatch({
        type: audioPlayerState.isPlaying ? 'PAUSE_AUDIO' : 'PLAY_AUDIO',
        data: {}
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

    fetchUpdates(standupId, dateKey);
  };

  return (
    <Container>
      <PureUpdates
        isLoading={isFetching}
        isLoadingMore={isFetching && dayOffset > 0}
        updates={updatesState}
        members={membersState}
        audioPlayerState={audioPlayerState}
        playPauseAudio={playPauseAudio}
        fetchMoreUpdates={fetchMoreUpdates}
      />
    </Container>
  );
}

Updates.propTypes = {
  standupId: PropTypes.string.isRequired
};

export default Updates;
