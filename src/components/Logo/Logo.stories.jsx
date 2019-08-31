import React from 'react';

import Logo from './Logo';

export default {
  title: 'components|Logo/Logo',
  component: Logo,
  parameters: {
    componentSubtitle: 'For branding'
  }
};

export const DefaultLogo = () => {
  return <Logo />;
};

DefaultLogo.story = {
  name: 'default'
};

export const SizedLogo = () => {
  return <Logo width="64px" />;
};

SizedLogo.story = {
  name: 'width'
};
