import styled from 'styled-components';

export const InviteList = styled.ul`
  margin: 0;
  padding: 1em 0;
  list-style: none;
`;

export const InviteListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  grid-gap: 1.5em;
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

export const LoadingInviteListItem = styled(InviteListItem)`
  :hover {
    cursor: wait;
    background-color: transparent;

    :nth-child(2n) {
      background-color: #fafafa;
    }
  }
`;

export const InviterInfo = styled.div`
  overflow: hidden;
`;

const Text = styled.p`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 240px;
`;

export const Email = styled(Text)``;

export const Meta = styled(Text)`
  color: var(--color-grey);
`;
