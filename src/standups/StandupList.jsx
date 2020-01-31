import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export { LoadingListItemText } from '../components/List';

export const ListContainer = styled.div``;

export const ListTitle = styled.p`
  margin: 0;
  padding: 0.1rem 1rem 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: bold;
  letter-spacing: 1.5px;
  color: var(--color-grey);
`;

export const List = styled.div``;

export const ListEmpty = styled.div`
  padding: 0.5em;
  text-align: center;
  color: var(--color-lightest-purple);
`;

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0.25em;
  align-items: center;
  padding: 0.1rem 1rem;
  text-decoration: none;
  color: var(--color-dark-grey);
  min-height: 27px;
  transition: all 0.1s linear;

  :hover {
    background-color: var(--color-light-grey);
    color: var(--color-dark-grey) !important;
  }
`;

export const ListItemLink = props => (
  <ListItem
    as={NavLink}
    {...props}
    activeStyle={{
      color: 'var(--color-darkest-grey)',
      backgroundColor: 'var(--color-light-grey)',
      fontWeight: 'bold'
    }}
  />
);

export const LoadingListItem = styled(ListItem)`
  :hover {
    cursor: wait;
    background-color: transparent;
  }
`;

export const ListItemText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
