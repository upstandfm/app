import React from 'react';
import { action } from '@storybook/addon-actions';

import Standup from './Standup';

const dispatch = action('dispatch');
const handleNextStep = action('handleNextStep');

export default {
  title: 'screens|New Standup/Standup',
  parameters: {
    componentSubtitle: 'Provide standup information'
  }
};

export const DefaultStandup = () => {
  return (
    <Standup
      standupName="Team awesome"
      dispatch={dispatch}
      handleNextStep={handleNextStep}
    />
  );
};

DefaultStandup.story = {
  name: 'default'
};
