import React from 'react';

import {
  ListContainer,
  ListTitle,
  List,
  ListEmpty,
  ListItem,
  ListItemText
} from './List';

import {
  LoadingListContainer,
  LoadingListItem,
  LoadingListItemText
} from './Loading';

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
    <LoadingListContainer>
      <ListTitle>List title</ListTitle>

      <List>
        <LoadingListItem>
          <LoadingListItemText>Loading something important</LoadingListItemText>
        </LoadingListItem>

        <LoadingListItem>
          <LoadingListItemText>Loading something important</LoadingListItemText>
        </LoadingListItem>

        <LoadingListItem>
          <LoadingListItemText>Loading something important</LoadingListItemText>
        </LoadingListItem>
      </List>
    </LoadingListContainer>
  );
};

LoadingList.story = {
  name: 'loading'
};

export const FlatList = () => {
  return (
    <ListContainer flat>
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

FlatList.story = {
  name: 'flat'
};
