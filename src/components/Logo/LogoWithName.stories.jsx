import React from 'react';
import styled from 'styled-components';

import LogoWithName from './LogoWithName';

const Header = styled.div`
  padding: 1em;
  background-color: var(--color-darkest-purple);
`;

export default {
  title: 'components|Logo/LogoWithName',
  component: LogoWithName,
  parameters: {
    componentSubtitle: 'For branding (use this in the header)'
  }
};

export const DefaultLogoWithName = () => {
  return (
    <Header>
      <LogoWithName />
    </Header>
  );
};

DefaultLogoWithName.story = {
  name: 'default'
};

export const SizedLogoWithName = () => {
  return (
    <Header>
      <LogoWithName width="320px" />
    </Header>
  );
};

SizedLogoWithName.story = {
  name: 'width'
};
