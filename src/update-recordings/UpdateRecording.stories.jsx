import React from 'react';
import { action } from '@storybook/addon-actions';

import UpdateRecording from './UpdateRecording';

const playPauseAudio = action('playPauseAudio');
const downloadFile = action('downloadFile');

export default {
  title: 'modules/UpdateRecording',
  component: UpdateRecording,
  parameters: {
    componentSubtitle: 'Standup member update recording component'
  }
};

export const DefaultUpdateRecording = () => {
  return (
    <UpdateRecording
      recording={{
        id: 'XQyaVFWe',
        createdBy: 'auth0|user1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: 'Yesterday',
        transcodingStatus: 'completed',
        transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/XQyaVFWe.mp3`
      }}
      isSelected={false}
      hasFile={false}
      downloadFile={downloadFile}
      downloadProgress={undefined}
      playPauseAudio={playPauseAudio}
      isPlaying={false}
    />
  );
};

DefaultUpdateRecording.story = {
  name: 'default'
};

export const TranscodingUpdateRecording = () => {
  return (
    <UpdateRecording
      recording={{
        id: 'XQyaVFWe',
        createdBy: 'auth0|user1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: 'Yesterday',
        transcodingStatus: 'transcoding',
        transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/XQyaVFWe.mp3`
      }}
      isSelected={false}
      hasFile={false}
      downloadFile={downloadFile}
      downloadProgress={undefined}
      playPauseAudio={playPauseAudio}
      isPlaying={false}
    />
  );
};

TranscodingUpdateRecording.story = {
  name: 'transcoding'
};

export const ErrorUpdateRecording = () => {
  return (
    <UpdateRecording
      recording={{
        id: 'XQyaVFWe',
        createdBy: 'auth0|user1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: 'Yesterday',
        transcodingStatus: 'error',
        transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/XQyaVFWe.mp3`
      }}
      isSelected={false}
      hasFile={false}
      downloadFile={downloadFile}
      downloadProgress={undefined}
      playPauseAudio={playPauseAudio}
      isPlaying={false}
    />
  );
};

ErrorUpdateRecording.story = {
  name: 'error'
};

export const UntitledUpdateRecording = () => {
  return (
    <UpdateRecording
      recording={{
        id: 'XQyaVFWe',
        createdBy: 'auth0|user1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: undefined,
        transcodingStatus: 'completed',
        transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/XQyaVFWe.mp3`
      }}
      isSelected={false}
      hasFile={false}
      downloadFile={downloadFile}
      downloadProgress={undefined}
      playPauseAudio={playPauseAudio}
      isPlaying={false}
    />
  );
};

UntitledUpdateRecording.story = {
  name: 'untitled'
};

export const DownloadingUpdateRecording = () => {
  return (
    <UpdateRecording
      recording={{
        id: 'XQyaVFWe',
        createdBy: 'auth0|user1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: 'Yesterday',
        transcodingStatus: 'completed',
        transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/XQyaVFWe.mp3`
      }}
      isSelected={false}
      hasFile={false}
      downloadFile={downloadFile}
      downloadProgress={33}
      playPauseAudio={playPauseAudio}
      isPlaying={false}
    />
  );
};

DownloadingUpdateRecording.story = {
  name: 'downloading'
};

export const PlayingUpdateRecording = () => {
  return (
    <UpdateRecording
      recording={{
        id: 'XQyaVFWe',
        createdBy: 'auth0|user1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: 'Yesterday',
        transcodingStatus: 'completed',
        transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/XQyaVFWe.mp3`
      }}
      isSelected={true}
      hasFile={true}
      downloadFile={downloadFile}
      downloadProgress={100}
      playPauseAudio={playPauseAudio}
      isPlaying={true}
    />
  );
};

PlayingUpdateRecording.story = {
  name: 'playing'
};

export const PausedUpdateRecording = () => {
  return (
    <UpdateRecording
      recording={{
        id: 'XQyaVFWe',
        createdBy: 'auth0|user1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: 'Yesterday',
        transcodingStatus: 'completed',
        transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/XQyaVFWe.mp3`
      }}
      isSelected={true}
      hasFile={true}
      downloadFile={downloadFile}
      downloadProgress={100}
      playPauseAudio={playPauseAudio}
      isPlaying={false}
    />
  );
};

PausedUpdateRecording.story = {
  name: 'paused'
};
