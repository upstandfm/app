import React from 'react';
import { action } from '@storybook/addon-actions';

import Recording from './Recording';

const onUpdateRecordingName = action('onUpdateRecordingName');
const playPauseAudio = action('playPauseAudio');
const onHandleDelete = action('onHandleDelete');

export default {
  title: 'screens|NewUpdate/Recording',
  component: Recording,
  parameters: {
    componentSubtitle: 'New update recording component'
  }
};

export const DefaultRecording = () => {
  return (
    <Recording
      recording={{
        id: '1a2z3x',
        blob: {},
        name: '',
        isUploaded: false
      }}
      isSelected={false}
      isPlaying={false}
      onUpdateRecordingName={onUpdateRecordingName}
      playPauseAudio={playPauseAudio}
      onHandleDelete={onHandleDelete}
    />
  );
};

DefaultRecording.story = {
  name: 'default'
};

export const NamedRecording = () => {
  return (
    <Recording
      recording={{
        id: '1a2z3x',
        blob: {},
        name: 'My awesome recording',
        isUploaded: false
      }}
      isSelected={false}
      isPlaying={false}
      onUpdateRecordingName={onUpdateRecordingName}
      playPauseAudio={playPauseAudio}
      onHandleDelete={onHandleDelete}
    />
  );
};

NamedRecording.story = {
  name: 'named'
};

export const PlayingRecording = () => {
  return (
    <Recording
      recording={{
        id: '1a2z3x',
        blob: {},
        name: 'My awesome recording',
        isUploaded: false
      }}
      isSelected={true}
      isPlaying={true}
      onUpdateRecordingName={onUpdateRecordingName}
      playPauseAudio={playPauseAudio}
      onHandleDelete={onHandleDelete}
    />
  );
};

PlayingRecording.story = {
  name: 'playing'
};

export const PausedRecording = () => {
  return (
    <Recording
      recording={{
        id: '1a2z3x',
        blob: {},
        name: 'My awesome recording',
        isUploaded: false
      }}
      isSelected={true}
      isPlaying={false}
      onUpdateRecordingName={onUpdateRecordingName}
      playPauseAudio={playPauseAudio}
      onHandleDelete={onHandleDelete}
    />
  );
};

PausedRecording.story = {
  name: 'paused'
};
