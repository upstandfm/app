import React from 'react';
import { action } from '@storybook/addon-actions';

import mockData from './mock-data';
import { PureUpdates } from './Updates';

const playPauseAudio = action('playPauseAudio');
const fetchMoreUpdates = action('fetchMoreUpdates');

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
      isLoadingMore={false}
      updates={mockData}
      audioPlayerState={{
        playingFile: {
          fileId: null,
          fileKey: null
        },
        isPlaying: false,
        downloadProgress: {},
        files: {}
      }}
      playPauseAudio={playPauseAudio}
      fetchMoreUpdates={fetchMoreUpdates}
    />
  );
};

DefaultUpdates.story = {
  name: 'default'
};

export const LoadingUpdates = () => {
  return (
    <PureUpdates
      isLoading={true}
      isLoadingMore={false}
      updates={mockData}
      audioPlayerState={{
        playingFile: {
          fileId: null,
          fileKey: null
        },
        isPlaying: false,
        downloadProgress: {},
        files: {}
      }}
      playPauseAudio={playPauseAudio}
      fetchMoreUpdates={fetchMoreUpdates}
    />
  );
};

LoadingUpdates.story = {
  name: 'loading'
};

export const LoadingMoreUpdates = () => {
  return (
    <PureUpdates
      isLoading={true}
      isLoadingMore={true}
      updates={mockData}
      audioPlayerState={{
        playingFile: {
          fileId: null,
          fileKey: null
        },
        isPlaying: false,
        downloadProgress: {},
        files: {}
      }}
      playPauseAudio={playPauseAudio}
      fetchMoreUpdates={fetchMoreUpdates}
    />
  );
};

LoadingMoreUpdates.story = {
  name: 'loading more'
};
