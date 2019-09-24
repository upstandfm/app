import React from 'react';
import { action } from '@storybook/addon-actions';

import { PureFinal } from './Final';

const _previousAction = action('handlePrevious');
const _createAction = action('handleCreate');

const props = {
  standupUsers: [],
  handlePrevious(e) {
    e.preventDefault();
    _previousAction();
  },
  handleCreate(e) {
    e.preventDefault();
    _createAction();
  }
};

export default {
  title: 'screens|New Standup/Final',
  component: PureFinal,
  parameters: {
    componentSubtitle: 'Finalize standup creation'
  }
};

export const DefaultFinal = () => {
  return (
    <PureFinal
      standupUsers={props.standupUsers}
      handlePrevious={props.handlePrevious}
      handleCreate={props.handleCreate}
    />
  );
};

DefaultFinal.story = {
  name: 'default'
};

export const FinalCreating = () => {
  return <PureFinal {...props} isCreating={true} />;
};

FinalCreating.story = {
  name: 'creating'
};

export const FinalCreateErr = () => {
  return (
    <PureFinal
      {...props}
      err={{
        message: 'Invalid request data',
        details: ['"standupName" is required']
      }}
    />
  );
};

FinalCreateErr.story = {
  name: 'error'
};
