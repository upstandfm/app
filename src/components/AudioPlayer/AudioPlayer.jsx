import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSnackbar } from '../Snackbar';
import Button from '../Button';

import { useAudioPlayer } from './AudioPlayerContext';
import useDownloadFile from './use-download-file';
import usePlayAudio from './use-play-audio';
import { formatTime } from './utils';

import { Container, Controls, Main, Title, Meta } from './Layout';
import { ProgressBar, Timing, PlayTime, TotalTime } from './Progress';

export function PureAudioPlayer({
  dispatch,
  isPlaying,
  isDownloading,
  fileTitle,
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
    if (!canPlay) {
      return;
    }

    isPlaying ? playAudio() : pauseAudio();
  }, [canPlay, isPlaying]);

  React.useEffect(() => {
    if (hasEnded) {
      dispatch({
        type: 'PLAY_PAUSE_AUDIO',
        data: {}
      });
    }
  }, [hasEnded]);

  const handlePlayPause = () => {
    dispatch({
      type: 'PLAY_PAUSE_AUDIO',
      data: {}
    });
  };

  const playedTime = formatTime(playedTimeSeconds);
  const totalTime = formatTime(totalTimeSeconds);
  const hasTimeData = Boolean(totalTimeSeconds);

  return (
    <Container>
      <Controls>
        <Button tertiary disabled={!canPlay} onClick={handlePlayPause}>
          <FontAwesomeIcon icon={isPaused ? 'play' : 'pause'} size="2x" />
        </Button>
      </Controls>

      <Main>
        <Title>{isDownloading ? 'Downloading file..' : fileTitle}</Title>

        <ProgressBar
          percent={progressPercent}
          handleSeek={() => console.log('seek')}
        />

        <Timing>
          <PlayTime datetime={playedTime}>
            {hasTimeData ? playedTime : ''}
          </PlayTime>

          <TotalTime datetime={totalTime}>
            {hasTimeData ? totalTime : ''}
          </TotalTime>
        </Timing>
      </Main>

      <Meta />
    </Container>
  );
}

PureAudioPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isDownloading: PropTypes.bool,
  fileTitle: PropTypes.string,
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
  const [downloadFile, abortDownloadFile, downloadErr] = useDownloadFile(
    audioPlayerDispatch
  );
  const [, snackbarDispatch] = useSnackbar();

  const { playingFile, files } = audioPlayerState;
  const { fileId, fileKey, fileTitle } = playingFile;
  const hasFile = Boolean(files[fileId]);

  React.useEffect(() => {
    if (!fileId || !fileKey) {
      return;
    }

    if (!hasFile) {
      downloadFile(fileId, fileKey);
    }

    return () => {
      abortDownloadFile();
    };
  }, [fileId, fileKey, hasFile]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!downloadErr) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to download audio',
        text: downloadErr.details
          ? `${downloadErr.message}: ${downloadErr.details}.`
          : downloadErr.message + '.'
      }
    });
  }, [downloadErr]); // eslint-disable-line react-hooks/exhaustive-deps

  const { isPlaying } = audioPlayerState;
  const { isDownloading } = audioPlayerState.downloadProgress[fileId] || {};
  const fileUrl = files[fileId];

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
      dispatch={audioPlayerDispatch}
      isPlaying={isPlaying}
      isDownloading={isDownloading}
      fileUrl={fileUrl}
      fileTitle={fileTitle}
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
