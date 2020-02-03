import React from 'react';
import { action } from '@storybook/addon-actions';

import { PureWorkspaceDropdown } from './WorkspaceDropdown';

const logout = action('logout');

export default {
  title: 'components/WorkspaceDropdown',
  component: PureWorkspaceDropdown,
  parameters: {
    componentSubtitle: 'Workspace dropdown component'
  }
};

export const LoadingWorkspaceDropdown = () => {
  return (
    <PureWorkspaceDropdown
      isLoading={true}
      refs={[]}
      workspaceName={undefined}
      userAvatarUrl={undefined}
      userFullName={undefined}
      userEmail={undefined}
      logout={logout}
    />
  );
};

LoadingWorkspaceDropdown.story = {
  name: 'loading'
};

export const DefaultWorkspaceDropdown = () => {
  return (
    <PureWorkspaceDropdown
      isLoading={false}
      refs={[]}
      workspaceName={'Upstand FM'}
      userAvatarUrl={'https://avatars1.githubusercontent.com/u/6201287'}
      userFullName={'Daniël Illouz'}
      userEmail={'daniel@upstand.fm'}
      logout={logout}
    />
  );
};

DefaultWorkspaceDropdown.story = {
  name: 'default'
};

export const LongTextWorkspaceDropdown = () => {
  return (
    <PureWorkspaceDropdown
      isLoading={false}
      refs={[]}
      workspaceName={'My awesome workspace with a very long name'}
      userAvatarUrl={'https://avatars1.githubusercontent.com/u/6201287'}
      userFullName={'Daniël Dandi Dan Illouz'}
      userEmail={'daniel.dandi.dan.illouz@upstand.fm'}
      logout={logout}
    />
  );
};

LongTextWorkspaceDropdown.story = {
  name: 'long text'
};

export const NoInfoWorkspaceNameDropdown = () => {
  return (
    <PureWorkspaceDropdown
      isLoading={false}
      refs={[]}
      workspaceName={undefined}
      userAvatarUrl={undefined}
      userFullName={undefined}
      userEmail={undefined}
      logout={logout}
    />
  );
};

NoInfoWorkspaceNameDropdown.story = {
  name: 'no data'
};
