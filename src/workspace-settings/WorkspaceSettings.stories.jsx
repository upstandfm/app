import React from 'react';

import { PureWorkspaceSettings } from './WorkspaceSettings';

export default {
  title: 'modules/WorkspaceSettings',
  component: PureWorkspaceSettings,
  parameters: {
    componentSubtitle: 'Screen that shows workspace settings'
  }
};

export const LoadingWorkspaceSettings = () => {
  return (
    <PureWorkspaceSettings
      isFetching={true}
      fetchErr={null}
      id={undefined}
      createdBy={undefined}
      createdAt={undefined}
      updatedAt={undefined}
      name={undefined}
      slug={undefined}
    />
  );
};

LoadingWorkspaceSettings.story = {
  name: 'fetching'
};

export const ErrorWorkspaceSettings = () => {
  return (
    <PureWorkspaceSettings
      isFetching={false}
      fetchErr={new Error('Kabooom!')}
      id={undefined}
      createdBy={undefined}
      createdAt={undefined}
      updatedAt={undefined}
      name={undefined}
      slug={undefined}
    />
  );
};

ErrorWorkspaceSettings.story = {
  name: 'error'
};

export const DefaultWorkspaceSettings = () => {
  const ISOdate = new Date().toISOString();

  return (
    <PureWorkspaceSettings
      isFetching={false}
      fetchErr={null}
      id="xzO8Ytr4"
      createdBy="user|5646564657564657564"
      createdAt={ISOdate}
      updatedAt={ISOdate}
      name="Upstand FM"
      slug="upstand-fm"
    />
  );
};

DefaultWorkspaceSettings.story = {
  name: 'default'
};
