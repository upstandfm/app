import React from 'react';
import { action } from '@storybook/addon-actions';

import mockData from './mock-data';
import { PureUpdates } from './Updates';

const playPauseAudio = action('playPauseAudio');

export default {
  title: 'screens|Standup/Updates',
  component: PureUpdates,
  parameters: {
    componentSubtitle: 'Screen that shows standup updates'
  }
};

export const DefaultUpdates = () => {
  return (
    <PureUpdates
      isLoading={false}
      updates={mockData}
      playPauseAudio={playPauseAudio}
      playingFileId={'1'}
      audioPlayerIsPlaying={false}
    />
  );
};

DefaultUpdates.story = {
  name: 'default'
};

export const LoadingUpdates = () => {
  return <PureUpdates isLoading={true} updates={{}} />;
};

LoadingUpdates.story = {
  name: 'loading'
};
