import React from 'react';
import { action } from '@storybook/addon-actions';

import { PureStandupUpdates } from './StandupUpdates';

const fetchNextPage = action('fetchNextPage');

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
      isFetchingMembers={true}
      isFetchingUpdates={true}
      cursor={null}
      fetchNextPage={fetchNextPage}
      membersById={{}}
      updatesByDate={[]}
    />
  );
};

LoadingStandupUpdates.story = {
  name: 'loading'
};
