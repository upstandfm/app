import React from 'react';
import { action } from '@storybook/addon-actions';

import { PureStandupUpdates } from './StandupUpdates';

const fetchMoreUpdates = action('fetchMoreUpdates');

export default {
  title: 'modules/StandupUpdates',
  component: PureStandupUpdates,
  parameters: {
    componentSubtitle: 'Screen that shows standup updates'
  }
};

export const LoadingStandupUpdates = () => {
  return (
    <PureStandupUpdates
      isLoading={true}
      isLoadingMore={false}
      members={[]}
      updatesByDate={{}}
      fetchMoreUpdates={fetchMoreUpdates}
    />
  );
};

LoadingStandupUpdates.story = {
  name: 'loading'
};
