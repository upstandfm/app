import React from 'react';
import { action } from '@storybook/addon-actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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

export const TertiaryButton = () => {
  return (
    <Button tertiary onClick={handleClick}>
      Click Me
    </Button>
  );
};

TertiaryButton.story = {
  name: 'tertiary'
};

export const IconTextButton = () => {
  return (
    <Button onClick={handleClick}>
      <FontAwesomeIcon icon="plus" size="sm" /> Click Me
    </Button>
  );
};

IconTextButton.story = {
  name: 'icon + text'
};

export const DisabledButton = () => {
  return (
    <Button disabled onClick={handleClick}>
      Click Me
    </Button>
  );
};

DisabledButton.story = {
  name: 'disabled default'
};

export const DisabledSpecialButton = () => {
  return (
    <Button special disabled onClick={handleClick}>
      Click Me
    </Button>
  );
};

DisabledSpecialButton.story = {
  name: 'disabled special'
};

export const DisabledSecondaryButton = () => {
  return (
    <Button secondary disabled onClick={handleClick}>
      Click Me
    </Button>
  );
};

DisabledSecondaryButton.story = {
  name: 'disabled secondary'
};

export const DisabledTertiaryButton = () => {
  return (
    <Button tertiary disabled onClick={handleClick}>
      Click Me
    </Button>
  );
};

DisabledTertiaryButton.story = {
  name: 'disabled tertiary'
};
