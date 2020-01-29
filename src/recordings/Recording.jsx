import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ListItem } from '../components/List';
import Button from '../components/Button';

const PlayPauseButton = styled(Button)`
  width: 40px;
  height: 40px;
  padding: 0;
  color: ${props =>
    props.isSelected ? 'var(--color-light-purple)' : 'var(--color-grey)'};

  :disabled {
    visibility: hidden;
  }
`;

PlayPauseButton.propTypes = {
  isSelected: PropTypes.bool
};

const DeleteButton = styled(Button)`
  width: 40px;
  height: 40px;
  padding: 0;
  color: var(--color-grey);

  :disabled {
    visibility: hidden;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 1em;
  align-items: center;
`;

const RecordingName = styled.h4`
  margin: 0;
  font-weight: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Badge = styled.span`
  padding: 0.25em 0.5em;
  background-color: ${props =>
    props.status === 'error'
      ? 'var(--color-lightest-red)'
      : 'var(--color-lightest-purple)'};
  color: ${props =>
    props.status === 'error'
      ? 'var(--color-dark-red)'
      : 'var(--color-dark-purple)'};
  border-radius: var(--radius-size);
`;

Badge.propTypes = {
  status: PropTypes.oneOf(['transcoding', 'error', 'completed'])
};

function Recording({
  recording,
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
  const helpText = `${isPlaying ? 'pause' : 'play'} recording "${displayName}"`;
  const { transcodingStatus } = recording;
  const isReady = transcodingStatus === 'completed';
  const isDownloading = downloadProgress > 0 && downloadProgress < 100;

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
    <ListItem title={displayName}>
      <PlayPauseButton
        tertiary
        aria-label={isReady && !isDownloading ? helpText : ''}
        title={isReady && !isDownloading ? helpText : ''}
        isSelected={isSelected}
        onClick={handlePlayPauseRecording}
        disabled={!isReady}
      >
        {isDownloading ? (
          <FontAwesomeIcon icon="circle-notch" size="lg" spin />
        ) : (
          <FontAwesomeIcon icon={isPlaying ? 'pause' : 'play'} size="lg" />
        )}
      </PlayPauseButton>

      <Content>
        <RecordingName>{displayName}</RecordingName>

        {!isReady && (
          <Badge status={transcodingStatus}>
            {transcodingStatus === 'transcoding'
              ? 'processing'
              : transcodingStatus}
          </Badge>
        )}
      </Content>

      <DeleteButton tertiary title="not implemented yet" disabled>
        <FontAwesomeIcon icon="trash" />
      </DeleteButton>
    </ListItem>
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
  isSelected: PropTypes.bool.isRequired,
  hasFile: PropTypes.bool.isRequired,
  downloadFile: PropTypes.func.isRequired,
  downloadProgress: PropTypes.number,
  playPauseAudio: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired
};

export default Recording;
