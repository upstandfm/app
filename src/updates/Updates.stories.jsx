import React from 'react';
import { action } from '@storybook/addon-actions';

import { updatesMockData, membersMockData } from './mock-data';
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
      updates={updatesMockData}
      members={membersMockData}
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
      updates={updatesMockData}
      members={membersMockData}
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
      updates={updatesMockData}
      members={membersMockData}
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

export const EmptyUpdates = () => {
  return (
    <PureUpdates
      isLoading={false}
      isLoadingMore={false}
      updates={{ '01-01-2020': [] }}
      members={membersMockData}
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

EmptyUpdates.story = {
  name: 'empty'
};
