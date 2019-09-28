import React from 'react';
import { action } from '@storybook/addon-actions';

import ExitButton from './ExitButton';

const handleClick = action('onClick');

export default {
  title: 'components|Button/ExitButton',
  component: ExitButton,
  parameters: {
    componentSubtitle: 'Exit button'
  }
};

export const DefaultExitButton = () => {
  return <ExitButton aria-label="exit" title="exit" onClick={handleClick} />;
};

DefaultExitButton.story = {
  name: 'default'
};
