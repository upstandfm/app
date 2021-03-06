import styled from 'styled-components';

export const UserList = styled.ul`
  margin: 0;
  padding: 1em 0;
  list-style: none;
`;

export const UserListItem = styled.li`
  display: grid;
  grid-template-columns: auto 1fr 1fr auto;
  grid-gap: 1em;
  align-items: center;
  padding: 0.5rem 1rem;
  transition: all 0.1s linear;

  :nth-child(2n) {
    background-color: #fafafa;
  }

  :hover {
    background-color: var(--color-lighter-grey);
  }
`;

export const LoadingUserListItem = styled(UserListItem)`
  :hover {
    cursor: wait;
    background-color: transparent;

    :nth-child(2n) {
      background-color: #fafafa;
    }
  }
`;

export const UserInfo = styled.div`
  overflow: hidden;
  max-width: 240px;
`;

const Text = styled.p`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FullName = styled(Text)``;

export const Email = styled(Text)`
  color: var(--color-grey);
`;

export const Meta = styled(Text)`
  color: var(--color-grey);
  max-width: 240px;
`;
