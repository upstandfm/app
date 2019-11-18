import styled from 'styled-components';

export const ListContainer = styled.div`
  margin: 1em 0;
  border: 2px solid var(--color-grey);
  box-shadow: 6px 6px 0 0 var(--color-grey);
  background-color: var(--color-white);
`;

export const ListTitle = styled.h3`
  margin: 0;
  padding: 1rem 1rem 0 1rem;
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1rem 0;
`;

export const ListEmpty = styled.li`
  padding: 0.5rem 1rem;
  text-align: center;
  color: var(--color-grey);
`;

export const ListItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0.5em;
  align-items: center;
  padding: 0.5rem 1rem;

  :hover {
    background-color: var(--color-lighter-grey);
  }
`;

export const ListItemText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;
