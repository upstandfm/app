import React from 'react';

import { Skeleton } from '../Loading';

import {
  ListContainer,
  ListTitle,
  List,
  ListEmpty,
  ListItem,
  ListItemText
} from './List';

import { LoadingListItem } from './Loading';

export default {
  title: 'components/List',
  parameters: {
    componentSubtitle: 'Components to display items in a list'
  }
};

export const DefaultList = () => {
  return (
    <ListContainer>
      <ListTitle>List title</ListTitle>

      <List>
        <ListItem>
          <span>img</span>

          <ListItemText>Main text.</ListItemText>

          <span>meta</span>
        </ListItem>

        <ListItem>
          <span>img</span>

          <ListItemText>Main text.</ListItemText>

          <span>meta</span>
        </ListItem>

        <ListItem>
          <span>img</span>

          <ListItemText>Main text.</ListItemText>

          <span>meta</span>
        </ListItem>
      </List>
    </ListContainer>
  );
};

DefaultList.story = {
  name: 'default'
};

export const EmptyList = () => {
  return (
    <ListContainer>
      <ListTitle>List title</ListTitle>

      <List>
        <ListEmpty>No list items yet.</ListEmpty>
      </List>
    </ListContainer>
  );
};

EmptyList.story = {
  name: 'empty'
};

export const LoadingList = () => {
  return (
    <ListContainer>
      <ListTitle>List title</ListTitle>

      <List>
        <LoadingListItem>
          <Skeleton>Loading something important</Skeleton>
        </LoadingListItem>

        <LoadingListItem>
          <Skeleton>Loading something important</Skeleton>
        </LoadingListItem>

        <LoadingListItem>
          <Skeleton>Loading something important</Skeleton>
        </LoadingListItem>
      </List>
    </ListContainer>
  );
};

LoadingList.story = {
  name: 'loading'
};
