import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSnackbar } from '../Snackbar';
import Button from '../Button';

import { useAudioPlayer } from './AudioPlayerContext';
import useDownloadFile from './use-download-file';
import usePlayAudio from './use-play-audio';
import { formatTime } from './utils';

import { Container, Controls, Main, PlayState, Title, Meta } from './Layout';
import { ProgressBar, Timing, PlayTime, TotalTime } from './Progress';

export function LoadingAudioPlayer() {
  return (
    <Container>
      <Controls>
        <Button tertiary disabled>
          <PlayState>
            <FontAwesomeIcon icon="play" size="2x" />
          </PlayState>
        </Button>
      </Controls>

      <Main>
        <Title />

        <ProgressBar
          isDisabled={true}
          percent={0}
          handleSeek={() => undefined}
        />

        <Timing>
          <PlayTime />
          <TotalTime />
        </Timing>
      </Main>

      <Meta />
    </Container>
  );
}

export function PureAudioPlayer({
  fileTitle,
  isPlaying,
  isDownloading,
  playAudio,
  pauseAudio,
  canPlay,
  isSeeking,
  hasEnded,
  totalTimeSeconds,
  playedTimeSeconds,
  playProgressPercent,
  play,
  pause,
  seek
}) {
  React.useEffect(() => {
    if (!canPlay) {
      return;
    }

    isPlaying ? play() : pause();
  }, [canPlay, isPlaying, play, pause]);

  React.useEffect(() => {
    if (hasEnded) {
      pauseAudio();
    }
  }, [hasEnded, pauseAudio]);

  const progressBarEl = React.createRef();

  const handlePlayPause = () => {
    if (!canPlay) {
      return;
    }

    isPlaying ? pauseAudio() : playAudio();
  };

  const handleSeek = e => {
    if (!canPlay || isSeeking) {
      return;
    }

    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth
    const layoutWidth = progressBarEl.current.offsetWidth;

    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/offsetX
    const offsetX = e.nativeEvent.offsetX;

    seek(offsetX / layoutWidth);
  };

  const playedTime = formatTime(playedTimeSeconds);
  const totalTime = formatTime(totalTimeSeconds);
  const hasTimeData = Boolean(totalTimeSeconds);

  return (
    <Container>
      <Controls>
        <Button tertiary disabled={!canPlay} onClick={handlePlayPause}>
          <PlayState>
            {isDownloading ? (
              <FontAwesomeIcon icon="circle-notch" size="2x" spin />
            ) : (
              <FontAwesomeIcon icon={isPlaying ? 'pause' : 'play'} size="2x" />
            )}
          </PlayState>
        </Button>
      </Controls>

      <Main>
        <Title>{fileTitle}</Title>

        <ProgressBar
          ref={progressBarEl}
          isDisabled={!canPlay}
          percent={playProgressPercent}
          handleSeek={handleSeek}
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
  fileTitle: PropTypes.string,
  isPlaying: PropTypes.bool.isRequired,
  isDownloading: PropTypes.bool,
  playAudio: PropTypes.func.isRequired,
  pauseAudio: PropTypes.func.isRequired,
  canPlay: PropTypes.bool.isRequired,
  isSeeking: PropTypes.bool.isRequired,
  hasEnded: PropTypes.bool.isRequired,
  totalTimeSeconds: PropTypes.number.isRequired,
  playedTimeSeconds: PropTypes.number.isRequired,
  playProgressPercent: PropTypes.number.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  seek: PropTypes.func.isRequired
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

  const { isPlaying, playingFile, files } = audioPlayerState;

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

  const fileUrl = files[fileId];
  const [
    audio,
    playAudioErrMsg,
    canPlay,
    isSeeking,
    hasEnded,
    totalTimeSeconds,
    playedTimeSeconds,
    playProgressPercent,
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

  const { isDownloading } = audioPlayerState.downloadProgress[fileId] || {};
  const memoizedDispatch = React.useCallback(audioPlayerDispatch, []);

  const playAudio = React.useCallback(() => {
    memoizedDispatch({
      type: 'PLAY_AUDIO',
      data: {}
    });
  }, [memoizedDispatch]);

  const pauseAudio = React.useCallback(() => {
    memoizedDispatch({
      type: 'PAUSE_AUDIO',
      data: {}
    });
  }, [memoizedDispatch]);

  const memoizedPlay = React.useCallback(play, [audio]);
  const memoizedPause = React.useCallback(pause, [audio]);

  return (
    <PureAudioPlayer
      fileTitle={fileTitle}
      isPlaying={isPlaying}
      isDownloading={isDownloading}
      playAudio={playAudio}
      pauseAudio={pauseAudio}
      canPlay={canPlay}
      isSeeking={isSeeking}
      hasEnded={hasEnded}
      totalTimeSeconds={totalTimeSeconds}
      playedTimeSeconds={playedTimeSeconds}
      playProgressPercent={playProgressPercent}
      play={memoizedPlay}
      pause={memoizedPause}
      seek={seek}
    />
  );
}

export default AudioPlayer;
