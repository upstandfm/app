import styled from 'styled-components';

import { InlineLabel } from '../components/Form';

export const InvitesWrapper = styled.div`
  padding: 1em;
`;

export const Info = styled.p`
  color: var(--color-grey);
`;

export const CustomFormLabel = styled(InlineLabel)`
  grid-template-columns: 1fr auto;
`;

export const EmptyMessage = styled.p`
  margin: 0;
  padding: 1em 0 0 0;
  color: var(--color-grey);
`;
