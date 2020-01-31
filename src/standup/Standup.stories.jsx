import React from 'react';

import { PureStandup } from './Standup';

export default {
  title: 'modules/Standup',
  component: PureStandup,
  parameters: {
    componentSubtitle: 'Screen that shows a single standup'
  }
};

export const LoadingStandup = () => {
  return (
    <PureStandup
      standupId="Zxz0y6f"
      urlRouteMatch=""
      isLoading={true}
      standup={{}}
    />
  );
};

LoadingStandup.story = {
  name: 'loading'
};
