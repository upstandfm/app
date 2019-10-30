import React from 'react';

import mockData from './mock-data';
import { PureStandupMembers } from './StandupMembers';

export default {
  title: 'screens|Standup/Members',
  component: PureStandupMembers,
  parameters: {
    componentSubtitle: 'Screen that shows all standup members'
  }
};

export const DefaultStandupMembers = () => {
  return <PureStandupMembers isLoading={false} members={mockData} />;
};

DefaultStandupMembers.story = {
  name: 'default'
};

export const LoadingStandupMembers = () => {
  return <PureStandupMembers isLoading={true} />;
};

LoadingStandupMembers.story = {
  name: 'loading'
};
