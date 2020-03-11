import React from 'react';
import { action } from '@storybook/addon-actions';

import { PureChannelRecordings } from './ChannelRecordings';

const fetchNextPage = action('fetchNextPage');

export default {
  title: 'modules/ChannelRecordings',
  component: PureChannelRecordings,
  parameters: {
    componentSubtitle: 'Screen that shows channel recordings'
  }
};

export const LoadingChannelRecordings = () => {
  return (
    <PureChannelRecordings
      isFetchingMembers={true}
      isFetchingRecordings={true}
      cursor={null}
      fetchNextPage={fetchNextPage}
      membersById={{}}
      recordings={[]}
    />
  );
};

LoadingChannelRecordings.story = {
  name: 'loading'
};
