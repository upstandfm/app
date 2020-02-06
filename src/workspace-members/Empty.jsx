import React from 'react';
import styled from 'styled-components';

import Content, { Title, Subtitle, Section } from '../components/Content';

const Message = styled.p`
  margin: 0;
  padding: 1em;
  color: var(--color-grey);
`;

function Empty() {
  return (
    <Content>
      <Title>Workspace members</Title>
      <Subtitle>View and manage all users in your workspace.</Subtitle>

      <Section>
        <Message>No members to show.</Message>
      </Section>
    </Content>
  );
}

export default Empty;
