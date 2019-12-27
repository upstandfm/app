import styled from 'styled-components';

import { ListItemText } from '../components/List';
import { Input } from '../components/Form';

export const Name = styled(ListItemText)`
  text-transform: capitalize;
  font-weight: normal;
  max-width: 240px;
  display: inline-block;
  box-sizing: border-box;
`;

export const NameInput = styled(Input)`
  width: 100%;
`;

export const Actions = styled.div``;
