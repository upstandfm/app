import styled from 'styled-components';

export const ListContainer = styled.div`
  margin: 1em 0;
  border: 1px solid var(--color-lighter-grey);
  border-radius: 8px;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
`;

export const ListTitle = styled.h3`
  color: var(--color-grey);
  margin: 0;
  padding: 1em 0.75em 0 0.75em;
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1em 0;
`;

export const ListEmpty = styled.li`
  padding: 0.5em 1em;
  text-align: center;
  color: var(--color-grey);
`;

export const ListItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 0.5em;
  align-items: center;
  padding: 0.5em 1em;

  :nth-child(2n) {
    background-color: var(--color-lightest-grey);
  }
`;

export const ListItemText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
`;