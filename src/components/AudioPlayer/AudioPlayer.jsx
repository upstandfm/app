import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

import { useSnackbar } from '../Snackbar';
import Button from '../Button';

import { useAudioPlayer } from './AudioPlayerContext';
import usePlayAudio from './use-play-audio';
import { formatTime } from './utils';

import { Container, Controls, Main, Title } from './Layout';
import { ProgressBar, Timing, PlayTime, TotalTime } from './Progress';

const PlayPauseButton = styled(Button)`
  :disabled,
  :disabled:hover {
    color: var(--color-light-grey);
  }
`;

export function LoadingAudioPlayer() {
  return (
    <Container>
      <Controls>
        <PlayPauseButton tertiary disabled>
          <FontAwesomeIcon icon="play" size="2x" />
        </PlayPauseButton>
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
    </Container>
  );
}

export function PureAudioPlayer({
  fileTitle,
  isPlaying,
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

  const displayTitle = fileTitle || 'Untitled';
  const helpText = `${
    isPlaying ? 'pause' : 'play'
  } recording "${displayTitle}"`;
  const playedTime = formatTime(playedTimeSeconds);
  const totalTime = formatTime(totalTimeSeconds);
  const hasTimeData = Boolean(totalTimeSeconds);

  return (
    <Container>
      <Controls>
        <PlayPauseButton
          tertiary
          aria-label={helpText}
          title={helpText}
          disabled={!canPlay}
          onClick={handlePlayPause}
        >
          <FontAwesomeIcon icon={isPlaying ? 'pause' : 'play'} size="2x" />
        </PlayPauseButton>
      </Controls>

      <Main>
        <Title title={displayTitle}>{canPlay ? displayTitle : undefined}</Title>

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
    </Container>
  );
}

PureAudioPlayer.propTypes = {
  fileTitle: PropTypes.string,
  isPlaying: PropTypes.bool.isRequired,
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
  const [, snackbarDispatch] = useSnackbar();
  const [audioPlayerState, audioPlayerDispatch] = useAudioPlayer();

  const { isPlaying, playingFile, files } = audioPlayerState;
  const fileUrl = files[playingFile.id];

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

  const memoizedDispatch = React.useCallback(audioPlayerDispatch, []);

  const playAudio = React.useCallback(() => {
    memoizedDispatch({
      type: 'PLAY_AUDIO',
      data: {
        id: playingFile.id,
        title: playingFile.title
      }
    });
  }, [memoizedDispatch, playingFile.id, playingFile.title]);

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
      fileTitle={playingFile.title}
      isPlaying={isPlaying}
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
