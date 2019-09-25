import React from 'react';
import { action } from '@storybook/addon-actions';

import { PureMessage } from './Message';

const handleDismissMessage = action('handleDismissMessage');

export default {
  title: 'components|Snackbar/Message',
  component: PureMessage,
  parameters: {
    componentSubtitle: 'Snackbar message'
  }
};

export const DefaultMessage = () => {
  return (
    <PureMessage
      index={0}
      message={{
        title: 'Default title',
        text: 'This is a default message.'
      }}
      handleDismissMessage={handleDismissMessage}
    />
  );
};

DefaultMessage.story = {
  name: 'default'
};

export const SuccessMessage = () => {
  return (
    <PureMessage
      index={0}
      message={{
        type: 'success',
        title: 'Success title',
        text: 'This is a success message with medium sized text.'
      }}
      handleDismissMessage={handleDismissMessage}
    />
  );
};

SuccessMessage.story = {
  name: 'success'
};

export const ErrorMessage = () => {
  return (
    <PureMessage
      index={0}
      message={{
        type: 'error',
        title: 'Error title',
        text:
          'This is an error message with long text that describes something without describing it.'
      }}
      handleDismissMessage={handleDismissMessage}
    />
  );
};

ErrorMessage.story = {
  name: 'error'
};

export const QueuedMessages = () => {
  return (
    <PureMessage
      index={0}
      message={{
        title: 'Message',
        text: 'Message text with 2 more messages queued up.'
      }}
      queuedCount={2}
      handleDismissMessage={handleDismissMessage}
    />
  );
};

QueuedMessages.story = {
  name: 'queued'
};
