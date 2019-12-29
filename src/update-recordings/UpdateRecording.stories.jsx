import React from 'react';
import { action } from '@storybook/addon-actions';

import UpdateRecording from './UpdateRecording';

const playPauseAudio = action('playPauseAudio');
const downloadFile = action('downloadFile');

export default {
  title: 'screens|Standup/Updates/UpdateRecording',
  component: UpdateRecording,
  parameters: {
    componentSubtitle: 'Standup member update recording component'
  }
};

export const DefaultUpdateRecording = () => {
  return (
    <UpdateRecording
      recording={{
        recordingId: 'rec1',
        name: 'Yesterday',
        standupId: 'standup1',
        userId: 'auth0|user1',
        status: 'completed',
        createdAt: 1571999306858,
        updatedAt: 1571999306858,
        transcodedFileKey: `audio/standups/standup1/25-10-2019/auth0|user1/XQyaVFWe.mp3`
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
        recordingId: 'rec1',
        name: 'Yesterday',
        standupId: 'standup1',
        userId: 'auth0|user1',
        status: 'transcoding',
        createdAt: 1571999306858,
        updatedAt: 1571999306858,
        transcodedFileKey: `audio/standups/standup1/25-10-2019/auth0|user1/XQyaVFWe.mp3`
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
        recordingId: 'rec1',
        name: 'Yesterday',
        standupId: 'standup1',
        userId: 'auth0|user1',
        status: 'error',
        createdAt: 1571999306858,
        updatedAt: 1571999306858,
        transcodedFileKey: `audio/standups/standup1/25-10-2019/auth0|user1/XQyaVFWe.mp3`
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
        recordingId: 'rec1',
        name: undefined,
        standupId: 'standup1',
        userId: 'auth0|user1',
        status: 'completed',
        createdAt: 1571999306858,
        updatedAt: 1571999306858,
        transcodedFileKey: `audio/standups/standup1/25-10-2019/auth0|user1/XQyaVFWe.mp3`
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
        recordingId: 'rec1',
        name: 'Yesterday',
        standupId: 'standup1',
        userId: 'auth0|user1',
        status: 'completed',
        createdAt: 1571999306858,
        updatedAt: 1571999306858,
        transcodedFileKey: `audio/standups/standup1/25-10-2019/auth0|user1/XQyaVFWe.mp3`
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
        recordingId: 'rec1',
        name: 'Yesterday',
        standupId: 'standup1',
        userId: 'auth0|user1',
        status: 'completed',
        createdAt: 1571999306858,
        updatedAt: 1571999306858,
        transcodedFileKey: `audio/standups/standup1/25-10-2019/auth0|user1/XQyaVFWe.mp3`
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
        recordingId: 'rec1',
        name: 'Yesterday',
        standupId: 'standup1',
        userId: 'auth0|user1',
        status: 'completed',
        createdAt: 1571999306858,
        updatedAt: 1571999306858,
        transcodedFileKey: `audio/standups/standup1/25-10-2019/auth0|user1/XQyaVFWe.mp3`
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
