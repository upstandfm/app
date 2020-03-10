import React from 'react';

import { Skeleton } from '../components/Loading';

import { ListContainer, ListTitle, List, LoadingListItem } from './ChannelList';

function Loading() {
  return (
    <ListContainer>
      <ListTitle>CHANNELS</ListTitle>

      <List>
        <LoadingListItem>
          <Skeleton>Channel loading title</Skeleton>
        </LoadingListItem>

        <LoadingListItem>
          <Skeleton>Channel loading title</Skeleton>
        </LoadingListItem>

        <LoadingListItem>
          <Skeleton>Channel loading title</Skeleton>
        </LoadingListItem>
      </List>
    </ListContainer>
  );
}

export default Loading;
