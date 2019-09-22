import React from 'react';
import { action } from '@storybook/addon-actions';

import Invite from './Invite';

const dispatch = action('dispatch');
const handlePreviousStep = action('handlePreviousStep');
const handleNextStep = action('handleNextStep');

export default {
  title: 'screens|New Standup/Invite',
  parameters: {
    componentSubtitle: 'Invite users for the standup'
  }
};

export const DefaultInivte = () => {
  return (
    <Invite
      standupUsers={[]}
      dispatch={dispatch}
      handlePreviousStep={handlePreviousStep}
      handleNextStep={handleNextStep}
    />
  );
};

DefaultInivte.story = {
  name: 'default'
};
