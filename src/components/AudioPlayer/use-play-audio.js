import React from 'react';

// See:
// https://developer.mozilla.org/en-US/docs/Web/API/MediaError#Properties
const ERR_DETAILS_BY_CODE = {
  1: "The fetching of the associated resource was aborted by the user's request.",
  2: 'Some kind of network error occurred which prevented the media from being successfully fetched, despite having previously been available.',
  3: 'Despite having previously been determined to be usable, an error occurred while trying to decode the media resource, resulting in an error.',
  4: 'The associated resource or media provider object has been found to be unsuitable.'
};

/**
 * Custom hook to play audio files.
 *
 * @param {String} src - Audio source
 *
 * @return {Array}
 */
function usePlayAudio(src) {
  const [audio, setAudio] = React.useState(null);
  const [err, setErr] = React.useState('');
  const [canPlay, setCanPlay] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(true);
  const [isSeeking, setIsSeeking] = React.useState(false);
  const [hasEnded, setHasEnded] = React.useState(false);
  const [totalTimeSeconds, setTotalTimeSeconds] = React.useState(0);
  const [playedTimeSeconds, setPlayedTimeSeconds] = React.useState(0);
  const [progressPercent, setProgressPercent] = React.useState(0);

  React.useEffect(() => {
    if (!src) {
      return;
    }

    const audio = new Audio(src);
    setAudio(audio);

    const onError = () => {
      let msg = audio.error.message;

      const details = ERR_DETAILS_BY_CODE[audio.error.code];
      if (details) {
        msg += `. ${details}`;
      }

      setErr(msg);
    };
    audio.addEventListener('error', onError);

    const onLoadedData = () => {
      setErr('');
      setTotalTimeSeconds(audio.duration);
      setPlayedTimeSeconds(audio.currentTime);
    };
    audio.addEventListener('loadeddata', onLoadedData);

    const onCanPlay = () => {
      setCanPlay(true);
    };
    audio.addEventListener('canplay', onCanPlay);

    const onPause = () => {
      setIsPaused(true);
    };
    audio.addEventListener('pause', onPause);

    const onPlay = () => {
      setIsPaused(false);
    };
    audio.addEventListener('play', onPlay);

    const onTimeUpdate = () => {
      setPlayedTimeSeconds(audio.currentTime);

      const percent = (audio.currentTime / audio.duration) * 100;
      setProgressPercent(percent);
    };
    audio.addEventListener('timeupdate', onTimeUpdate);

    const onSeeking = () => {
      setIsSeeking(true);
    };
    audio.addEventListener('seeking', onSeeking);

    const onSeeked = () => {
      setIsSeeking(false);
    };
    audio.addEventListener('seeked', onSeeked);

    const onPlaying = () => {
      setHasEnded(false);
    };
    audio.addEventListener('playing', onPlaying);

    const onEnded = () => {
      setHasEnded(true);
    };
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.pause();

      audio.removeEventListener('error', onError);
      audio.removeEventListener('loadeddata', onLoadedData);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('seeking', onSeeking);
      audio.removeEventListener('seeked', onSeeked);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('ended', onEnded);
    };
  }, [src]);

  const play = () => {
    audio.play();
  };

  const pause = () => {
    audio.pause();
  };

  /**
   * Rewind audio.
   *
   * @param {Number} stepSeconds - How many seconds to rewind
   */
  const rewind = stepSeconds => {
    const newCurrentTime = audio.currentTime - stepSeconds;
    audio.currentTime = newCurrentTime;
  };

  /**
   * Fast forward audio.
   *
   * @param {Number} stepSeconds - How many seconds to fast forward
   */
  const forward = stepSeconds => {
    const newCurrentTimeSeconds = audio.currentTime + stepSeconds;

    // Prevents the progress bar from "skipping"
    if (newCurrentTimeSeconds > audio.duration) {
      audio.currentTime = audio.duration;
      return;
    }

    audio.currentTime = newCurrentTimeSeconds;
  };

  /**
   * Seek audio.
   *
   * @param {Number} newCurrentTimeSeconds - The "seeked" time in seconds
   */
  const seek = newCurrentTimeSeconds => {
    if (newCurrentTimeSeconds < 0) {
      audio.currentTime = 0;
      return;
    }

    // Prevents the progress bar from "skipping"
    if (newCurrentTimeSeconds > audio.duration) {
      audio.currentTime = audio.duration;
      return;
    }

    audio.currentTime = newCurrentTimeSeconds;
  };

  return [
    err,
    canPlay,
    isPaused,
    isSeeking,
    hasEnded,
    totalTimeSeconds,
    playedTimeSeconds,
    progressPercent,
    play,
    pause,
    rewind,
    forward,
    seek
  ];
}

export default usePlayAudio;
