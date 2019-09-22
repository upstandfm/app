import React from 'react';
import { action } from '@storybook/addon-actions';

import { ComponentsByStepIndex, PureNewStandup } from './NewStandup';
import CreateError from './CreateError';

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

export const StepThree = () => {
  return <PureNewStandup {...props} stepIndex={2} />;
};

StepThree.story = {
  name: 'step 3'
};

export const CreateStandupError = () => {
  return (
    <CreateError
      message="Invalid request data"
      details={['"standupName" is required']}
    />
  );
};

CreateStandupError.story = {
  name: 'create error'
};
