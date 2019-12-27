import React from 'react';
import { action } from '@storybook/addon-actions';

import { PureUploadRecording } from './UploadRecording';

const handleRetry = action('handleRetry');

export default {
  title: 'screens|NewUpdate/UploadRecording',
  component: PureUploadRecording,
  parameters: {
    componentSubtitle: 'New update recording component'
  }
};

export const DefaultUploadRecording = () => {
  return (
    <PureUploadRecording
      displayName="My awesome recording"
      err={undefined}
      progress={0}
      handleRetry={handleRetry}
    />
  );
};

DefaultUploadRecording.story = {
  name: 'default'
};

export const UntitledUploadRecording = () => {
  return (
    <PureUploadRecording
      displayName=""
      err={undefined}
      progress={0}
      handleRetry={handleRetry}
    />
  );
};

UntitledUploadRecording.story = {
  name: 'untitled'
};

export const LongNameUploadRecording = () => {
  return (
    <PureUploadRecording
      displayName="A recording with a very long name that is very descriptive"
      err={undefined}
      progress={0}
      handleRetry={handleRetry}
    />
  );
};

LongNameUploadRecording.story = {
  name: 'long name'
};

export const ProgressUploadRecording = () => {
  return (
    <PureUploadRecording
      displayName="My awesome recording"
      err={undefined}
      progress={63}
      handleRetry={handleRetry}
    />
  );
};

ProgressUploadRecording.story = {
  name: 'progress'
};

export const DoneUploadRecording = () => {
  return (
    <PureUploadRecording
      displayName="My awesome recording"
      err={undefined}
      progress={100}
      handleRetry={handleRetry}
    />
  );
};

DoneUploadRecording.story = {
  name: 'done'
};

export const ErrorUploadRecording = () => {
  return (
    <PureUploadRecording
      displayName="My awesome recording"
      err={new Error('Server exploded')}
      progress={63}
      handleRetry={handleRetry}
    />
  );
};

ErrorUploadRecording.story = {
  name: 'error'
};
