import React from 'react';

import mockData from './mock-data';
import { getStandupsList } from './selectors';
import { PureStandups } from './Standups';

const standups = getStandupsList(mockData);

export default {
  title: 'screens|Standups',
  component: PureStandups,
  parameters: {
    componentSubtitle: 'Screen that shows all standups'
  }
};

export const DefaultStandups = () => {
  return <PureStandups standups={standups} />;
};

DefaultStandups.story = {
  name: 'default'
};

export const LoadingStandups = () => {
  return <PureStandups isLoading={true} />;
};

LoadingStandups.story = {
  name: 'loading'
};

export const ErrStandups = () => {
  return <PureStandups isLoading={false} err="Boom!" />;
};

ErrStandups.story = {
  name: 'error'
};
