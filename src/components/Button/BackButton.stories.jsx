import React from 'react';
import { action } from '@storybook/addon-actions';

import BackButton from './BackButton';

const handleClick = action('onClick');

export default {
  title: 'components|Button/BackButton',
  component: BackButton,
  parameters: {
    componentSubtitle: 'Back button'
  }
};

export const DefaultExitButton = () => {
  return (
    <BackButton aria-label="go back" title="go back" onClick={handleClick} />
  );
};

DefaultExitButton.story = {
  name: 'default'
};
