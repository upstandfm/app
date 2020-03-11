import React from 'react';
import { action } from '@storybook/addon-actions';

import { SnackbarProvider } from '../components/Snackbar';

import { PureNewUpdate } from './NewUpdate';

const handleGetPermission = action('handleGetPermission');
const onNewRecording = action('onNewRecording');
const onUpdateRecordingName = action('onUpdateRecordingName');
const onDeleteUpdate = action('onDeleteUpdate');
const handlePublish = action('handlePublish');
const onUploadedFile = action('onUploadedFile');
const playPauseAudio = action('playPauseAudio');

export default {
  title: 'modules/NewUpdate',
  component: PureNewUpdate,
  parameters: {
    componentSubtitle: 'Screen to record and publish a new update'
  }
};

export const DefaultNewUpdate = () => {
  return (
    <PureNewUpdate
      userMediaStream={undefined}
      isGettingPermission={false}
      permissionErr={undefined}
      handleGetPermission={handleGetPermission}
      channelId={'1a2z3x'}
      recordingsState={{}}
      audioPlayerState={{
        playingFile: {},
        isPlaying: false,
        files: {}
      }}
      playPauseAudio={playPauseAudio}
      isPublishing={false}
      onNewRecording={onNewRecording}
      onUpdateRecordingName={onUpdateRecordingName}
      onDeleteUpdate={onDeleteUpdate}
      handlePublish={handlePublish}
      onUploadedFile={onUploadedFile}
    />
  );
};

DefaultNewUpdate.story = {
  name: 'default'
};

export const NewUpdatePermission = () => {
  return (
    <PureNewUpdate
      userMediaStream={undefined}
      isGettingPermission={true}
      permissionErr={undefined}
      handleGetPermission={handleGetPermission}
      channelId={'1a2z3x'}
      recordingsState={{}}
      audioPlayerState={{
        playingFile: {},
        isPlaying: false,
        files: {}
      }}
      playPauseAudio={playPauseAudio}
      isPublishing={false}
      onNewRecording={onNewRecording}
      onUpdateRecordingName={onUpdateRecordingName}
      onDeleteUpdate={onDeleteUpdate}
      handlePublish={handlePublish}
      onUploadedFile={onUploadedFile}
    />
  );
};

NewUpdatePermission.story = {
  name: 'getting permission'
};

export const NewUpdatePermissionErr = () => {
  return (
    <SnackbarProvider>
      <PureNewUpdate
        userMediaStream={undefined}
        isGettingPermission={false}
        permissionErr={new Error()}
        handleGetPermission={handleGetPermission}
        channelId={'1a2z3x'}
        recordingsState={{}}
        audioPlayerState={{
          playingFile: {},
          isPlaying: false,
          files: {}
        }}
        playPauseAudio={playPauseAudio}
        isPublishing={false}
        onNewRecording={onNewRecording}
        onUpdateRecordingName={onUpdateRecordingName}
        onDeleteUpdate={onDeleteUpdate}
        handlePublish={handlePublish}
        onUploadedFile={onUploadedFile}
      />
    </SnackbarProvider>
  );
};

NewUpdatePermissionErr.story = {
  name: 'permission error'
};

export const NewUpdateMediaStream = () => {
  return (
    <SnackbarProvider>
      <PureNewUpdate
        userMediaStream={new MediaStream()}
        isGettingPermission={false}
        permissionErr={undefined}
        handleGetPermission={handleGetPermission}
        channelId={'1a2z3x'}
        recordingsState={{}}
        audioPlayerState={{
          playingFile: {},
          isPlaying: false,
          files: {}
        }}
        playPauseAudio={playPauseAudio}
        isPublishing={false}
        onNewRecording={onNewRecording}
        onUpdateRecordingName={onUpdateRecordingName}
        onDeleteUpdate={onDeleteUpdate}
        handlePublish={handlePublish}
        onUploadedFile={onUploadedFile}
      />
    </SnackbarProvider>
  );
};

NewUpdateMediaStream.story = {
  name: 'media stream'
};
