import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ListItem } from '../components/List';

const RecordingListItem = styled(ListItem)`
  background-color: ${props =>
    props.isSelected ? 'var(--color-lightest-grey)' : 'inherit'};

  .play-state {
    color: ${props =>
      props.isSelected
        ? 'var(--color-dark-purple)'
        : 'var(--color-light-grey)'};
  }

  :hover {
    cursor: ${props => {
      if (!props.isReady) {
        return 'not-allowed';
      }

      if (props.isDownloading) {
        return 'wait';
      }

      return 'pointer';
    }};

    .play-state {
      color: var(--color-dark-purple);
    }
  }

  :focus {
    background-color: var(--color-lightest-grey);

    .play-state {
      color: var(--color-dark-purple);
    }
  }
`;

RecordingListItem.propTypes = {
  isSelected: PropTypes.bool,
  isReady: PropTypes.bool,
  isDownloading: PropTypes.bool
};

RecordingListItem.defaultProps = {
  isSelected: false,
  isReady: false,
  isDownloading: false
};

const PlayState = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  width: 40px;
  height: 40px;
`;

export function RecordingPlayState({ isReady, isDownloading, isPlaying }) {
  if (!isReady) {
    return <PlayState className="play-state" />;
  }

  if (isDownloading) {
    return (
      <PlayState className="play-state">
        <FontAwesomeIcon icon="circle-notch" size="lg" spin />
      </PlayState>
    );
  }

  if (isPlaying) {
    return (
      <PlayState className="play-state">
        <FontAwesomeIcon icon="pause" size="lg" />
      </PlayState>
    );
  }

  return (
    <PlayState className="play-state">
      <FontAwesomeIcon icon="play" size="lg" />
    </PlayState>
  );
}

RecordingPlayState.propTypes = {
  isReady: PropTypes.bool,
  isDownloading: PropTypes.bool,
  isPlaying: PropTypes.bool
};

RecordingPlayState.defaultProps = {
  isReady: false,
  isDownloading: false,
  isPlaying: false
};

const RecordingContent = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 1em;
  align-items: center;
`;

const RecordingTitle = styled.h4`
  margin: 0;
  text-transform: capitalize;
  font-weight: normal;
`;

const RecordingStatus = styled.div`
  justify-self: center;
`;

const StatusBadge = styled.span`
  padding: 0.25em 0.5em;
  background-color: ${props =>
    props.status === 'error'
      ? 'var(--color-lightest-red)'
      : 'var(--color-lightest-purple)'};
  color: ${props =>
    props.status === 'error'
      ? 'var(--color-dark-red)'
      : 'var(--color-dark-purple)'};
  border-radius: 4px;
`;

StatusBadge.propTypes = {
  status: PropTypes.oneOf(['transcoding', 'error', 'completed'])
};

const RecordingMeta = styled.div`
  color: var(--color-grey);
`;

function UserRecording({ recording, audioPlayerState, playPauseAudio }) {
  const { recordingId, transcodedFileKey, filename, status } = recording;
  const isSelected = recordingId === audioPlayerState.playingFile.fileId;
  const isPlaying = isSelected && audioPlayerState.isPlaying;
  const { isDownloading } =
    audioPlayerState.downloadProgress[recordingId] || {};
  const helpText = `${isPlaying ? 'pause' : 'play'} recording`;
  const isReady = status === 'completed';

  const handlePlayPauseRecording = e => {
    if (!isReady || isDownloading) {
      return;
    }

    const recordingId = e.currentTarget.getAttribute('data-recording-id');
    const fileKey = e.currentTarget.getAttribute('data-file-key');
    const fileTitle = filename;
    playPauseAudio(recordingId, fileKey, fileTitle);
  };

  const handleKeyPress = e => {
    if (e.key !== 'Enter') {
      return;
    }

    handlePlayPauseRecording(e);
  };

  return (
    <RecordingListItem
      tabIndex={isReady ? '0' : '-1'}
      aria-label={isReady && !isDownloading ? helpText : ''}
      title={isReady && !isDownloading ? helpText : ''}
      data-recording-id={recordingId}
      data-file-key={transcodedFileKey}
      isReady={isReady}
      isDownloading={isDownloading}
      isSelected={isSelected}
      onClick={handlePlayPauseRecording}
      onKeyDown={handleKeyPress}
    >
      <RecordingPlayState
        isReady={isReady}
        isDownloading={isDownloading}
        isPlaying={isPlaying}
      />

      <RecordingContent>
        <RecordingTitle>{filename}</RecordingTitle>

        <RecordingStatus>
          {!isReady && (
            <StatusBadge status={status}>
              {status === 'transcoding' ? 'processing' : status}
            </StatusBadge>
          )}
        </RecordingStatus>

        <RecordingMeta />
      </RecordingContent>
    </RecordingListItem>
  );
}

UserRecording.propTypes = {
  recording: PropTypes.shape({
    recordingId: PropTypes.string.isRequired,
    filename: PropTypes.string.isRequired,
    standupId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['transcoding', 'error', 'completed']),
    createdAt: PropTypes.number.isRequired,
    updatedAt: PropTypes.number.isRequired,
    transcodedFileKey: PropTypes.string
  }),
  audioPlayerState: PropTypes.shape({
    playingFile: PropTypes.shape({
      fileId: PropTypes.string,
      fileKey: PropTypes.string
    }),
    isPlaying: PropTypes.bool.isRequired,
    downloadProgress: PropTypes.object.isRequired,
    files: PropTypes.object.isRequired
  }),
  playPauseAudio: PropTypes.func.isRequired
};

export default UserRecording;
