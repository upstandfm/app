import React from 'react';
import styled from 'styled-components';

import mockData from './mock-data';
import { PureStandupMembers } from './StandupMembers';

const Container = styled.div`
  background-color: var(--color-white);
  padding: 1em;
  border: 1px dashed var(--color-light-grey);
  border-radius: var(--radius-size);
`;

export default {
  title: 'modules/StandupMembers',
  component: PureStandupMembers,
  parameters: {
    componentSubtitle: 'Screen that shows all standup members'
  }
};

export const DefaultStandupMembers = () => {
  return (
    <Container>
      <PureStandupMembers isLoading={false} members={mockData} />
    </Container>
  );
};

DefaultStandupMembers.story = {
  name: 'default'
};

export const LoadingStandupMembers = () => {
  return (
    <Container>
      <PureStandupMembers isLoading={true} />
    </Container>
  );
};

LoadingStandupMembers.story = {
  name: 'loading'
};
