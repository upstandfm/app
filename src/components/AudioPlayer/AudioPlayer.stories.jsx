import React from 'react';
import { action } from '@storybook/addon-actions';

import { PureAudioPlayer } from './AudioPlayer';

const playAudio = action('playAudio');
const pauseAudio = action('pauseAudio');
const play = action('play');
const pause = action('pause');
const seek = action('seek');

export default {
  title: 'components|AudioPlayer',
  component: PureAudioPlayer,
  parameters: {
    componentSubtitle: 'Custom audio player'
  }
};

export const DefaultAudioPlayer = () => {
  return (
    <PureAudioPlayer
      fileTitle={''}
      isPlaying={false}
      playAudio={playAudio}
      pauseAudio={pauseAudio}
      canPlay={false}
      isSeeking={false}
      hasEnded={false}
      totalTimeSeconds={0}
      playedTimeSeconds={0}
      playProgressPercent={0}
      play={play}
      pause={pause}
      seek={seek}
    />
  );
};

DefaultAudioPlayer.story = {
  name: 'default'
};

export const PlayingAudioPlayer = () => {
  return (
    <PureAudioPlayer
      fileTitle={'My audio file'}
      isPlaying={true}
      playAudio={playAudio}
      pauseAudio={pauseAudio}
      canPlay={true}
      isSeeking={false}
      hasEnded={false}
      totalTimeSeconds={63}
      playedTimeSeconds={21}
      playProgressPercent={33}
      play={play}
      pause={pause}
      seek={seek}
    />
  );
};

PlayingAudioPlayer.story = {
  name: 'playing'
};

export const PausedAudioPlayer = () => {
  return (
    <PureAudioPlayer
      fileTitle={'My audio file'}
      isPlaying={false}
      playAudio={playAudio}
      pauseAudio={pauseAudio}
      canPlay={true}
      isSeeking={false}
      hasEnded={false}
      totalTimeSeconds={63}
      playedTimeSeconds={21}
      playProgressPercent={33}
      play={play}
      pause={pause}
      seek={seek}
    />
  );
};

PausedAudioPlayer.story = {
  name: 'paused'
};
