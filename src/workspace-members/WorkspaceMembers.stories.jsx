import React from 'react';

import { PureWorkspaceMembers } from './WorkspaceMembers';
import { members } from './mock-data';

export default {
  title: 'modules/WorkspaceMembers',
  component: PureWorkspaceMembers,
  parameters: {
    componentSubtitle: 'Screen that shows workspace members'
  }
};

export const LoadingWorkspaceMembers = () => {
  return <PureWorkspaceMembers isLoading={true} members={[]} />;
};

LoadingWorkspaceMembers.story = {
  name: 'loading'
};

export const DefaultWorkspaceMembers = () => {
  return <PureWorkspaceMembers isLoading={false} members={members} />;
};

DefaultWorkspaceMembers.story = {
  name: 'default'
};

export const NoWorkspaceMembers = () => {
  return <PureWorkspaceMembers isLoading={false} members={[]} />;
};

NoWorkspaceMembers.story = {
  name: 'no members'
};
