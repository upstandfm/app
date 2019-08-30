import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from './Button';

const handleClick = action('onClick');

export default {
  title: 'components/Button',
  component: Button,
  parameters: {
    componentSubtitle: 'For primary user actions'
  }
};

export const defaultButton = () => {
  return (
    <Button onClick={handleClick} invertTextColor>
      click me
    </Button>
  );
};

defaultButton.story = {
  name: '(default) invertTextColor'
};

export const commonButton = () => {
  return (
    <Button onClick={handleClick} common>
      click me
    </Button>
  );
};

commonButton.story = {
  name: 'common'
};

export const dangerButton = () => {
  return (
    <Button onClick={handleClick} danger invertTextColor>
      click me
    </Button>
  );
};

dangerButton.story = {
  name: 'danger + invertTextColor'
};
