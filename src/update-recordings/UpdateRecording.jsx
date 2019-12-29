import React from 'react';
import PropTypes from 'prop-types';

import {
  Recording,
  PlayState,
  Content,
  Title,
  Status,
  Badge,
  Meta
} from './Recording';

function UpdateRecording({
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

  const helpText = `${isPlaying ? 'pause' : 'play'} recording`;
  const { status } = recording;
  const isReady = status === 'completed';
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

  const handleKeyPress = e => {
    if (e.key !== 'Enter') {
      return;
    }

    handlePlayPauseRecording(e);
  };

  return (
    <Recording
      tabIndex={isReady ? '0' : '-1'}
      aria-label={isReady && !isDownloading ? helpText : ''}
      title={isReady && !isDownloading ? helpText : ''}
      isReady={isReady}
      isDownloading={isDownloading}
      isSelected={isSelected}
      onClick={handlePlayPauseRecording}
      onKeyDown={handleKeyPress}
    >
      <PlayState
        isReady={isReady}
        isDownloading={isDownloading}
        isPlaying={isPlaying}
      />

      <Content>
        <Title>{recording.name || 'Untitled'}</Title>

        <Status>
          {!isReady && (
            <Badge status={status}>
              {status === 'transcoding' ? 'processing' : status}
            </Badge>
          )}
        </Status>

        <Meta />
      </Content>
    </Recording>
  );
}

UpdateRecording.propTypes = {
  recording: PropTypes.shape({
    recordingId: PropTypes.string.isRequired,
    name: PropTypes.string,
    standupId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['transcoding', 'error', 'completed']),
    createdAt: PropTypes.number.isRequired,
    updatedAt: PropTypes.number.isRequired,
    transcodedFileKey: PropTypes.string
  }),
  isSelected: PropTypes.bool.isRequired,
  hasFile: PropTypes.bool.isRequired,
  downloadFile: PropTypes.func.isRequired,
  downloadProgress: PropTypes.number,
  playPauseAudio: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired
};

export default UpdateRecording;
