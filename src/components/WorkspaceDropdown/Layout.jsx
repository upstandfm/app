import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Trigger = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.5em;
  align-items: center;
  width: 220px;
`;

export const WorkspaceName = styled.h3`
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-dark-grey);
`;

export const Icon = styled(FontAwesomeIcon)`
  color: var(--color-grey);
`;

export const User = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.5em;
  align-items: center;
  padding: 8px 14px;
`;

export const UserInfo = styled.div`
  width: 150px;
`;

const Text = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FullName = styled(Text)`
  color: var(--color-dark-grey);
`;

export const Email = styled(Text)`
  color: var(--color-grey);
`;

export const BlankButton = styled.button`
  box-sizing: border-box;
  background: none;
  border: none;
  font-size: 1em;
  text-align: left;
  margin: 0;
  padding: 8px 14px;
  width: 100%;
  display: block;
  outline: 0;

  :hover {
    cursor: pointer;
    background-color: var(--color-light-grey);
  }
`;
