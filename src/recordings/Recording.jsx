import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { formatDate } from '../utils';

import Avatar from '../components/Avatar';
import Button from '../components/Button';

import { RecordingListItem, Name, Meta } from './RecordingList';
import Status from './Status';

const PlayPauseButton = styled(Button)`
  width: 40px;
  height: 40px;
  padding: 0;
  color: ${props =>
    props.isSelected ? 'var(--color-light-purple)' : 'inherit'};

  :disabled {
    visibility: hidden;
  }

  :hover {
    cursor: ${props => (props.isLoading ? 'wait' : 'pointer')};
  }
`;

PlayPauseButton.propTypes = {
  isSelected: PropTypes.bool,
  isLoading: PropTypes.bool
};

function Recording({
  recording,
  member,
  isSelected,
  hasFile,
  downloadFile,
  downloadProgress,
  playPauseAudio,
  isPlaying
}) {
  const [triggerDownload, setTriggerDownload] = React.useState(false);

  React.useEffect(() => {
    if (!triggerDownload) {
      return;
    }

    downloadFile(recording);
  }, [triggerDownload]); // eslint-disable-line react-hooks/exhaustive-deps

  const displayName = recording.name || 'Untitled';
  const helpText = `${isPlaying ? 'Pause' : 'Play'} recording "${displayName}"`;
  const { transcodingStatus } = recording;
  const isReady = transcodingStatus === 'completed';
  const isDownloading = downloadProgress > 0 && downloadProgress < 100;
  const createdEpoch = new Date(recording.createdAt).getTime();
  const recordedAt = formatDate(createdEpoch);

  const handlePlayPauseRecording = () => {
    if (!isReady || isDownloading) {
      return;
    }

    if (!hasFile) {
      setTriggerDownload(true);
      return;
    }

    playPauseAudio(recording, isPlaying);
  };

  return (
    <RecordingListItem title={displayName}>
      <PlayPauseButton
        tertiary
        aria-label={isReady && !isDownloading ? helpText : ''}
        title={isReady && !isDownloading ? helpText : ''}
        isSelected={isSelected}
        onClick={handlePlayPauseRecording}
        disabled={!isReady}
        isLoading={isDownloading}
      >
        {isDownloading ? (
          <FontAwesomeIcon icon="circle-notch" size="lg" spin />
        ) : (
          <FontAwesomeIcon icon={isPlaying ? 'pause' : 'play'} size="lg" />
        )}
      </PlayPauseButton>

      <Name>{displayName}</Name>

      {!isReady ? (
        <Status status={transcodingStatus}>{transcodingStatus}</Status>
      ) : (
        <span />
      )}

      <Meta title={recording.createdAt}>{recordedAt}</Meta>

      <Avatar
        title={member.fullName}
        fullName={member.fullName}
        avatarUrl={member.avatarUrl}
        altText=""
      />

      <div>
        <Button size="small" tertiary disabled title="Not implemented yet">
          <FontAwesomeIcon icon="trash" />
        </Button>
      </div>
    </RecordingListItem>
  );
}

Recording.propTypes = {
  recording: PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    name: PropTypes.string,
    transcodingStatus: PropTypes.oneOf(['transcoding', 'error', 'completed']),
    transcodedFileKey: PropTypes.string
  }),
  member: PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    fullName: PropTypes.string,
    avatarUrl: PropTypes.string
  }),
  isSelected: PropTypes.bool.isRequired,
  hasFile: PropTypes.bool.isRequired,
  downloadFile: PropTypes.func.isRequired,
  downloadProgress: PropTypes.number,
  playPauseAudio: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired
};

export default Recording;
