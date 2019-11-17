import React from 'react';

import Info from './Info';

const now = Date.now();

const standup = {
  standupId: '1',
  standupName: 'Team awesome',
  createdAt: now,
  updatedAt: now
};

export default {
  title: 'screens|Standup/Info',
  component: Info,
  parameters: {
    componentSubtitle: 'Component that shows standup information'
  }
};

export const DefaultInfo = () => {
  return <Info standup={standup} />;
};

DefaultInfo.story = {
  name: 'default'
};
