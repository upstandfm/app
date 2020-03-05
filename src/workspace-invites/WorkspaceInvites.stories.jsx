import React from 'react';

import { PureWorkspaceInvites } from './WorkspaceInvites';
import { invites } from './mock-data';

export default {
  title: 'modules/WorkspaceInvites',
  component: PureWorkspaceInvites,
  parameters: {
    componentSubtitle: 'Screen that shows workspace invites'
  }
};

export const LoadingWorkspaceInvites = () => {
  return <PureWorkspaceInvites isLoading={true} invites={[]} />;
};

LoadingWorkspaceInvites.story = {
  name: 'loading'
};

export const DefaultWorkspaceInvites = () => {
  return <PureWorkspaceInvites isLoading={false} invites={invites} />;
};

DefaultWorkspaceInvites.story = {
  name: 'default'
};

export const NoWorkspaceInvites = () => {
  return <PureWorkspaceInvites isLoading={false} invites={[]} />;
};

NoWorkspaceInvites.story = {
  name: 'no invites'
};
