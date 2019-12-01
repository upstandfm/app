import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

export { LoadingListItemText } from '../components/List';

export const ListContainer = styled.div``;

export const ListTitle = styled.p`
  margin: 0;
  padding: 1em 1em 0.25em 1em;
  font-weight: normal;
  letter-spacing: 1px;
  color: var(--color-light-grey);
`;

export const List = styled.div``;

export const ListEmpty = styled.div`
  padding: 0.5em;
  text-align: center;
  color: var(--color-grey);
`;

const ListItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0.25em;
  align-items: center;
  padding: 0.1em 1em 0.1em 1.5em;
  color: var(--color-lighter-grey);
  font-weight: bold;
  min-height: 27px;
  transition: all 0.1s linear;

  :hover {
    background-color: var(--color-lighter-purple);
    color: var(--color-darkest-purple) !important;
  }
`;

export const ListItemLink = props => (
  <ListItem
    as={Link}
    {...props}
    getProps={({ isCurrent }) => {
      const normalStyles = {
        textDecoration: 'none',
        color: 'var(--color-lighter-grey)'
      };

      const activeStyles = {
        textDecoration: 'none',
        color: 'var(--color-darkest-purple)',
        backgroundColor: 'var(--color-lighter-purple)'
      };

      return {
        style: isCurrent ? activeStyles : normalStyles
      };
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
