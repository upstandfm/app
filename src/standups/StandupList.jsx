import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

export { LoadingListItemText } from '../components/List';

export const ListContainer = styled.div``;

export const ListTitle = styled.p`
  margin: 0;
  padding: 1em 1em 0.5em 1em;
  font-size: 0.8em;
  font-weight: bold;
  letter-spacing: 1px;
  color: var(--color-lightest-purple);
`;

export const List = styled.div``;

export const ListEmpty = styled.div`
  padding: 0.5em;
  text-align: center;
  color: var(--color-lightest-purple);
`;

const ListItem = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0.25em;
  align-items: center;
  padding: 0.1em 1em 0.1em 1.5em;
  font-weight: normal;
  min-height: 27px;
  font-weight: normal;
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
    getProps={({ isCurrent, isPartiallyCurrent }) => {
      const normalStyles = {
        textDecoration: 'none',
        color: 'var(--color-white)'
      };

      const activeStyles = {
        textDecoration: 'none',
        color: 'var(--color-darkest-purple)',
        backgroundColor: 'var(--color-lighter-purple)',
        fontWeight: 'bold'
      };

      const isActive = isCurrent || isPartiallyCurrent;

      return {
        style: isActive ? activeStyles : normalStyles
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
