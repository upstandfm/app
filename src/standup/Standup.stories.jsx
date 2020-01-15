import React from 'react';

import { PureStandup } from './Standup';

export default {
  title: 'modules/Standup',
  component: PureStandup,
  parameters: {
    componentSubtitle: 'Screen that shows a single standup'
  }
};

export const LoadingStandups = () => {
  return <PureStandup isLoading={true} standup={{}} />;
};

LoadingStandups.story = {
  name: 'loading'
};
