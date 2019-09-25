import React from 'react';
import { action } from '@storybook/addon-actions';

import mockData from './mock-data';
import { PureStandups } from './Standups';

const fetchNextPage = action('fetchNextPage');

export default {
  title: 'screens|Standups',
  component: PureStandups,
  parameters: {
    componentSubtitle: 'Screen that shows all standups'
  }
};

export const DefaultStandups = () => {
  return <PureStandups isLoading={false} standups={mockData} />;
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

export const LoadMoreStandups = () => {
  return (
    <PureStandups
      isLoading={false}
      cursor="1q2w3e4r5t6y="
      standups={mockData}
      fetchNextPage={fetchNextPage}
    />
  );
};

LoadMoreStandups.story = {
  name: 'load more'
};

export const FetchingMoreStandups = () => {
  return (
    <PureStandups
      isLoading={true}
      cursor="1q2w3e4r5t6y="
      standups={mockData}
      fetchNextPage={fetchNextPage}
    />
  );
};

FetchingMoreStandups.story = {
  name: 'loading more'
};

export const EmptyStandups = () => {
  return <PureStandups isLoading={false} standups={[]} />;
};

EmptyStandups.story = {
  name: 'empty'
};
