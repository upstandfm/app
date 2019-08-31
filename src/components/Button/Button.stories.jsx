import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from './Button';

const handleClick = action('onClick');

export default {
  title: 'components|Button',
  component: Button,
  parameters: {
    componentSubtitle: 'For primary user actions'
  }
};

export const DefaultButton = () => {
  return (
    <Button onClick={handleClick} invertTextColor>
      click me
    </Button>
  );
};

DefaultButton.story = {
  name: '(default) invertTextColor'
};

export const CommonButton = () => {
  return (
    <Button onClick={handleClick} common>
      click me
    </Button>
  );
};

CommonButton.story = {
  name: 'common'
};

export const DangerButton = () => {
  return (
    <Button onClick={handleClick} danger invertTextColor>
      click me
    </Button>
  );
};

DangerButton.story = {
  name: 'danger + invertTextColor'
};
