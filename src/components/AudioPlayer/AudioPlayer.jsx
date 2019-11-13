import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSnackbar } from '../Snackbar';
import Button from '../Button';

import { useAudioPlayer } from './AudioPlayerContext';
import useDownloadFile from './use-download-file';
import usePlayAudio from './use-play-audio';

import { Container, Controls, Main, Title, Meta } from './Layout';
import { ProgressBar, Timing, PlayTime, TotalTime } from './Progress';

export function PureAudioPlayer({
  isPlaying,
  isDownloading,
  fileUrl,
  onDonePlaying,
  canPlay,
  isPaused,
  isSeeking,
  hasEnded,
  totalTimeSeconds,
  playedTimeSeconds,
  progressPercent,
  playAudio,
  pauseAudio,
  seekAudio
}) {
  React.useEffect(() => {
    if (!fileUrl || !canPlay) {
      return;
    }

    isPlaying ? playAudio() : pauseAudio();
  }, [isPlaying, fileUrl, canPlay]);

  React.useEffect(() => {
    if (hasEnded) {
      onDonePlaying();
    }
  }, [hasEnded]);

  return (
    <Container>
      <Controls>
        <Button tertiary disabled={!canPlay}>
          <FontAwesomeIcon icon={isPaused ? 'play' : 'pause'} size="2x" />
        </Button>
      </Controls>

      <Main>
        <Title>
          {isDownloading ? 'Downloading file..' : 'Audio file title'}
        </Title>

        <ProgressBar
          percent={progressPercent}
          handleSeek={() => console.log('seek')}
        />

        <Timing>
          <PlayTime>0:33</PlayTime>
          <TotalTime>3:00</TotalTime>
        </Timing>
      </Main>

      <Meta />
    </Container>
  );
}

PureAudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isDownloading: PropTypes.bool,
  fileUrl: PropTypes.string,
  onDonePlaying: PropTypes.func.isRequired,
  canPlay: PropTypes.bool.isRequired,
  isPaused: PropTypes.bool.isRequired,
  isSeeking: PropTypes.bool.isRequired,
  hasEnded: PropTypes.bool.isRequired,
  totalTimeSeconds: PropTypes.number.isRequired,
  playedTimeSeconds: PropTypes.number.isRequired,
  progressPercent: PropTypes.number.isRequired,
  playAudio: PropTypes.func.isRequired,
  pauseAudio: PropTypes.func.isRequired,
  seekAudio: PropTypes.func.isRequired
};

PureAudioPlayer.defaultProps = {
  isDownloading: false
};

function AudioPlayer() {
  const [audioPlayerState, audioPlayerDispatch] = useAudioPlayer();
  const [downloadFile, abortDownloadFile, err] = useDownloadFile(
    audioPlayerDispatch
  );
  const [, snackbarDispatch] = useSnackbar();

  const { playingFile, files } = audioPlayerState;
  const { fileId, fileKey } = playingFile;
  const hasFile = Boolean(files[fileId]);

  React.useEffect(() => {
    if (!fileId || !fileKey) {
      return;
    }

    if (hasFile) {
      return;
    }

    downloadFile(fileId, fileKey);

    return () => {
      abortDownloadFile();
    };
  }, [fileId, fileKey, hasFile]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!err) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to download audio',
        text: err.details
          ? `${err.message}: ${err.details}.`
          : err.message + '.'
      }
    });
  }, [err]); // eslint-disable-line react-hooks/exhaustive-deps

  const { isPlaying } = audioPlayerState;
  const { isDownloading } = audioPlayerState.downloadProgress[fileId] || {};
  const fileUrl = files[fileId];

  const pauseAudio = () => {
    audioPlayerDispatch({
      type: 'PAUSE_AUDIO',
      data: {}
    });
  };

  const [
    playAudioErrMsg,
    canPlay,
    isPaused,
    isSeeking,
    hasEnded,
    totalTimeSeconds,
    playedTimeSeconds,
    progressPercent,
    play,
    pause,
    ,
    ,
    seek
  ] = usePlayAudio(fileUrl);

  React.useEffect(() => {
    if (!playAudioErrMsg) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to play audio',
        text: playAudioErrMsg
      }
    });
  }, [playAudioErrMsg]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PureAudioPlayer
      isPlaying={isPlaying}
      isDownloading={isDownloading}
      fileUrl={fileUrl}
      onDonePlaying={pauseAudio}
      canPlay={canPlay}
      isPaused={isPaused}
      isSeeking={isSeeking}
      hasEnded={hasEnded}
      totalTimeSeconds={totalTimeSeconds}
      playedTimeSeconds={playedTimeSeconds}
      progressPercent={progressPercent}
      playAudio={play}
      pauseAudio={pause}
      seekAudio={seek}
    />
  );
}

export default AudioPlayer;
