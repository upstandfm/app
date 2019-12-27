import React from 'react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import mockData from './mock-data';
import { PureStandups } from './Standups';

const fetchNextPage = action('fetchNextPage');

const Container = styled.div`
  background-color: var(--color-darkest-purple);
  width: 260px;
  padding: 1em 0;
`;

export default {
  title: 'screens|Standups',
  component: PureStandups,
  parameters: {
    componentSubtitle: 'Screen that shows all standups'
  }
};

export const DefaultStandups = () => {
  return (
    <Container>
      <PureStandups
        isLoading={false}
        standups={mockData}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  );
};

DefaultStandups.story = {
  name: 'default'
};

export const LoadingStandups = () => {
  return (
    <Container>
      <PureStandups isLoading={true} fetchNextPage={fetchNextPage} />
    </Container>
  );
};

LoadingStandups.story = {
  name: 'loading'
};

export const LoadMoreStandups = () => {
  return (
    <Container>
      <PureStandups
        isLoading={false}
        cursor="1q2w3e4r5t6y="
        standups={mockData}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  );
};

LoadMoreStandups.story = {
  name: 'load more'
};

export const FetchingMoreStandups = () => {
  return (
    <Container>
      <PureStandups
        isLoading={true}
        cursor="1q2w3e4r5t6y="
        standups={mockData}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  );
};

FetchingMoreStandups.story = {
  name: 'loading more'
};

export const EmptyStandups = () => {
  return (
    <Container>
      <PureStandups
        isLoading={false}
        standups={[]}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  );
};

EmptyStandups.story = {
  name: 'empty'
};
