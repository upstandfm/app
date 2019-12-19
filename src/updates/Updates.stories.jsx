import React from 'react';
import { action } from '@storybook/addon-actions';

import { updatesMockData, membersMockData } from './mock-data';
import { PureUpdates } from './Updates';

const fetchMoreUpdates = action('fetchMoreUpdates');

export default {
  title: 'screens|Standup/Updates',
  component: PureUpdates,
  parameters: {
    componentSubtitle: 'Screen that shows standup updates'
  }
};

export const LoadingUpdates = () => {
  return (
    <PureUpdates
      isLoading={true}
      isLoadingMore={false}
      updates={updatesMockData}
      members={membersMockData}
      fetchMoreUpdates={fetchMoreUpdates}
    />
  );
};

LoadingUpdates.story = {
  name: 'loading'
};

export const EmptyUpdates = () => {
  return (
    <PureUpdates
      isLoading={false}
      isLoadingMore={false}
      updates={{ '01-01-2020': [] }}
      members={membersMockData}
      fetchMoreUpdates={fetchMoreUpdates}
    />
  );
};

EmptyUpdates.story = {
  name: 'empty'
};
