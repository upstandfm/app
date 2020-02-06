import React from 'react';

import { PureAccountSettings } from './AccountSettings';

export default {
  title: 'modules/AccountSettings',
  component: PureAccountSettings,
  parameters: {
    componentSubtitle: 'Screen that shows account settings'
  }
};

export const DefaultAccountSettings = () => {
  return (
    <PureAccountSettings
      userId="user|56ea56df5e56a6ff64ea"
      workspaceId="xzO8Xxtr4"
      username="danillouz"
      email="daniel@upstand.fm"
      emailIsVerified={true}
      fullName="Daniël Illouz"
      avatarUrl="https://avatars1.githubusercontent.com/u/6201287"
    />
  );
};

DefaultAccountSettings.story = {
  name: 'default'
};

export const UnverifiedAccountSettings = () => {
  return (
    <PureAccountSettings
      userId="user|56ea56df5e56a6ff64ea"
      workspaceId="xzO8Xxtr4"
      username="danillouz"
      email="daniel@upstand.fm"
      emailIsVerified={false}
      fullName="Daniël Illouz"
      avatarUrl="https://avatars1.githubusercontent.com/u/6201287"
    />
  );
};

UnverifiedAccountSettings.story = {
  name: 'unverified email'
};
