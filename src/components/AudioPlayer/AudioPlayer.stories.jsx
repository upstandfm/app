import React from 'react';

import { PureAudioPlayer } from './AudioPlayer';

export default {
  title: 'components|AudioPlayer',
  component: PureAudioPlayer,
  parameters: {
    componentSubtitle: 'Custom audio player'
  }
};

export const DefaultAudioPlayer = () => {
  return <PureAudioPlayer isPlaying={false} />;
};

DefaultAudioPlayer.story = {
  name: 'default'
};
