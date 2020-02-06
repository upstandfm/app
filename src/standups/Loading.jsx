import React from 'react';

import { Skeleton } from '../components/Loading';

import { ListContainer, ListTitle, List, LoadingListItem } from './StandupList';

function Loading() {
  return (
    <ListContainer>
      <ListTitle>PRIVATE</ListTitle>

      <List>
        <LoadingListItem>
          <Skeleton>Standup loading title</Skeleton>
        </LoadingListItem>

        <LoadingListItem>
          <Skeleton>Standup loading title</Skeleton>
        </LoadingListItem>

        <LoadingListItem>
          <Skeleton>Standup loading title</Skeleton>
        </LoadingListItem>
      </List>
    </ListContainer>
  );
}

export default Loading;
