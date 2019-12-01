import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

export { LoadingListItemText } from '../components/List';

export const ListContainer = styled.div``;

export const ListTitle = styled.p`
  margin: 0;
  padding: 1em 1em 0.25em 1em;
  font-weight: normal;
  color: var(--color-light-grey);
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ListEmpty = styled.li`
  padding: 0.5em;
  text-align: center;
  color: var(--color-grey);
`;

export const ListItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0.25em;
  align-items: center;
  padding: 0.1em 1em 0.1em 1.5em;
  color: var(--color-lighter-grey) !important;
  font-weight: bold;
  min-height: 27px;
  transition: all 0.1s linear;

  :hover {
    background-color: var(--color-lighter-purple);
    color: var(--color-darkest-purple) !important;
  }
`;

const StyledLink = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0.25em;
  align-items: center;
  padding: 0.1em 1em 0.1em 1.5em;
  color: var(--color-lighter-grey);
  font-weight: bold;
  text-decoration: none;
  min-height: 27px;
  transition: all 0.1s linear;

  :hover {
    background-color: var(--color-lighter-purple);
    color: var(--color-darkest-purple);
  }
`;

export const ListItemLink = props => (
  <StyledLink
    {...props}
    getProps={({ isCurrent }) => {
      const normalStyles = {
        //
      };

      const activeStyles = {
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
  }
`;

export const ListItemText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;