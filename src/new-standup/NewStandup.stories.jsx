import React from 'react';
import { action } from '@storybook/addon-actions';

import { ComponentsByStepIndex, PureNewStandup } from './NewStandup';

const props = {
  componentsByStepIndex: ComponentsByStepIndex,
  standup: {
    name: '',
    users: []
  },
  dispatch: action('dispatch'),
  handleNextStep: action('handleNextStep'),
  handlePreviousStep: action('handlePreviousStep')
};

export default {
  title: 'screens|New Standup',
  parameters: {
    componentSubtitle: 'Screen that shows the standup creation form'
  }
};

export const DefaultNewStandup = () => {
  return <PureNewStandup {...props} stepIndex={-1} />;
};

DefaultNewStandup.story = {
  name: 'default'
};

export const StepOne = () => {
  return <PureNewStandup {...props} stepIndex={0} />;
};

StepOne.story = {
  name: 'step 1'
};

export const StepTwo = () => {
  return <PureNewStandup {...props} stepIndex={1} />;
};

StepTwo.story = {
  name: 'step 2'
};
