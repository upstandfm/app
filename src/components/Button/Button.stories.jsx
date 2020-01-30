import React from 'react';
import { action } from '@storybook/addon-actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from './Button';

const handleClick = action('onClick');

export default {
  title: 'components/Button',
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

export const IconTextButton = () => {
  return (
    <Button onClick={handleClick}>
      <FontAwesomeIcon icon="plus" size="sm" /> Click Me
    </Button>
  );
};

IconTextButton.story = {
  name: 'default + icon'
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

export const SmallTertiaryButton = () => {
  return (
    <Button size="small" tertiary onClick={handleClick}>
      Click Me
    </Button>
  );
};

SmallTertiaryButton.story = {
  name: 'small tertiary'
};

export const RoundButton = () => {
  return (
    <Button round onClick={handleClick}>
      Add
    </Button>
  );
};

RoundButton.story = {
  name: 'round'
};

export const DisabledRoundButton = () => {
  return (
    <Button round disabled onClick={handleClick}>
      Add
    </Button>
  );
};

DisabledRoundButton.story = {
  name: 'disabled round'
};
