import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from './Button';

const handleClick = action('onClick');

export default {
  title: 'components|Button',
  component: Button,
  parameters: {
    componentSubtitle: 'For primary & secondary user actions'
  }
};

export const DefaultButton = () => {
  return <Button onClick={handleClick}>Click Me</Button>;
};

DefaultButton.story = {
  name: 'default'
};

export const SecondaryButton = () => {
  return (
    <Button secondary onClick={handleClick}>
      Click Me
    </Button>
  );
};

SecondaryButton.story = {
  name: 'secondary'
};

export const SpecialButton = () => {
  return (
    <Button special onClick={handleClick}>
      Click Me
    </Button>
  );
};

SpecialButton.story = {
  name: 'special'
};

export const DisabledButton = () => {
  return (
    <Button disabled onClick={handleClick}>
      Click Me
    </Button>
  );
};

DisabledButton.story = {
  name: 'disabled'
};
