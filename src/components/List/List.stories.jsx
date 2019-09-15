import React from 'react';

import {
  ListContainer,
  ListTitle,
  List,
  ListEmpty,
  ListItem,
  ListItemText
} from './List';

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
