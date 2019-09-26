import React from 'react';

import Info from './Info';

const now = Date.now();

const standup = {
  id: '1',
  standupName: 'Team awesome',
  createdAt: now,
  updatedAt: now
};

const standupWithBg = {
  id: '1',
  standupName: 'Team awesome',
  createdAt: now,
  updatedAt: now,
  standupImageUrl:
    'https://images.unsplash.com/photo-1499938971550-7ad287075e0d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2467&q=80'
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

export const InfoWithBg = () => {
  return <Info standup={standupWithBg} />;
};

InfoWithBg.story = {
  name: 'bg image'
};
