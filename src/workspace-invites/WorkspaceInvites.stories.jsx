import React from 'react';
import { action } from '@storybook/addon-actions';

import { PureWorkspaceInvites } from './WorkspaceInvites';
import { invites } from './mock-data';

const createInvite = action('createInvite');

export default {
  title: 'modules/WorkspaceInvites',
  component: PureWorkspaceInvites,
  parameters: {
    componentSubtitle: 'Screen that shows workspace invites'
  }
};

export const LoadingWorkspaceInvites = () => {
  return (
    <PureWorkspaceInvites
      isLoading={true}
      invites={[]}
      inviterFullName="Daniël Illouz"
      createInvite={createInvite}
      isCreating={false}
    />
  );
};

LoadingWorkspaceInvites.story = {
  name: 'loading'
};

export const NoWorkspaceInvites = () => {
  return (
    <PureWorkspaceInvites
      isLoading={false}
      invites={[]}
      inviterFullName="Daniël Illouz"
      createInvite={createInvite}
      isCreating={false}
    />
  );
};

NoWorkspaceInvites.story = {
  name: 'no invites'
};

export const DefaultWorkspaceInvites = () => {
  return (
    <PureWorkspaceInvites
      isLoading={false}
      invites={invites}
      inviterFullName="Daniël Illouz"
      createInvite={createInvite}
      isCreating={false}
    />
  );
};

DefaultWorkspaceInvites.story = {
  name: 'default'
};

export const CreatingWorkspaceInvite = () => {
  return (
    <PureWorkspaceInvites
      isLoading={false}
      invites={invites}
      inviterFullName="Daniël Illouz"
      createInvite={createInvite}
      isCreating={true}
    />
  );
};

CreatingWorkspaceInvite.story = {
  name: 'creating'
};
