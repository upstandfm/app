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

export const IconRoundButton = () => {
  return (
    <Button round onClick={handleClick}>
      <FontAwesomeIcon icon="plus" size="lg" />
    </Button>
  );
};

IconRoundButton.story = {
  name: 'icon + round'
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
