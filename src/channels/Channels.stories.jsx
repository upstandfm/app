import React from 'react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import mockData from './mock-data';
import { PureChannels } from './Channels';

const fetchNextPage = action('fetchNextPage');

const Container = styled.div`
  background-color: var(--color-white);
  border: 1px dashed var(--color-light-grey);
  width: 260px;
  padding: 1em 0;
`;

export default {
  title: 'modules/Channels',
  component: PureChannels,
  parameters: {
    componentSubtitle: 'Screen that shows all channels'
  }
};

export const DefaultChannels = () => {
  return (
    <Container>
      <PureChannels
        isLoading={false}
        channels={mockData}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  );
};

DefaultChannels.story = {
  name: 'default'
};

export const LoadingChannels = () => {
  return (
    <Container>
      <PureChannels isLoading={true} fetchNextPage={fetchNextPage} />
    </Container>
  );
};

LoadingChannels.story = {
  name: 'loading'
};

export const LoadMoreChannels = () => {
  return (
    <Container>
      <PureChannels
        isLoading={false}
        cursor="1q2w3e4r5t6y="
        channels={mockData}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  );
};

LoadMoreChannels.story = {
  name: 'load more'
};

export const FetchingMoreChannels = () => {
  return (
    <Container>
      <PureChannels
        isLoading={true}
        cursor="1q2w3e4r5t6y="
        channels={mockData}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  );
};

FetchingMoreChannels.story = {
  name: 'loading more'
};

export const EmptyChannels = () => {
  return (
    <Container>
      <PureChannels
        isLoading={false}
        channels={[]}
        fetchNextPage={fetchNextPage}
      />
    </Container>
  );
};

EmptyChannels.story = {
  name: 'empty'
};
