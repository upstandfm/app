import React from 'react';

import mockData from './mock-data';
import { PureUpdates } from './Updates';

export default {
  title: 'screens|Standup/Updates',
  component: PureUpdates,
  parameters: {
    componentSubtitle: 'Screen that shows standup updates'
  }
};

export const DefaultUpdates = () => {
  return <PureUpdates isLoading={false} updates={mockData} />;
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
