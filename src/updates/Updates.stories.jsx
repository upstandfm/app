import React from 'react';
import { action } from '@storybook/addon-actions';

import { PureUpdates } from './Updates';

const fetchMoreUpdates = action('fetchMoreUpdates');

export default {
  title: 'modules/Updates',
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
      updates={{}}
      members={[]}
      fetchMoreUpdates={fetchMoreUpdates}
    />
  );
};

LoadingUpdates.story = {
  name: 'loading'
};
