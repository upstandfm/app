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

export const DefaultUserRecording = () => {
  return (
    <UpdateRecording
      recording={{
        recordingId: 'rec1',
        filename: 'yesterday',
        standupId: 'standup1',
        userId: 'auth0|user1',
        status: 'completed',
        createdAt: 1571999306858,
        updatedAt: 1571999306858,
        transcodedFileKey: `audio/standups/standup1/25-10-2019/auth0|user1/yesterday.mp3`
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

DefaultUserRecording.story = {
  name: 'default'
};

export const TranscodingUserRecording = () => {
  return (
    <UpdateRecording
      recording={{
        recordingId: 'rec1',
        filename: 'yesterday',
        standupId: 'standup1',
        userId: 'auth0|user1',
        status: 'transcoding',
        createdAt: 1571999306858,
        updatedAt: 1571999306858,
        transcodedFileKey: `audio/standups/standup1/25-10-2019/auth0|user1/yesterday.mp3`
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

TranscodingUserRecording.story = {
  name: 'transcoding'
};

export const ErrorUserRecording = () => {
  return (
    <UpdateRecording
      recording={{
        recordingId: 'rec1',
        filename: 'yesterday',
        standupId: 'standup1',
        userId: 'auth0|user1',
        status: 'error',
        createdAt: 1571999306858,
        updatedAt: 1571999306858,
        transcodedFileKey: `audio/standups/standup1/25-10-2019/auth0|user1/yesterday.mp3`
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

ErrorUserRecording.story = {
  name: 'error'
};

export const DownloadingUserRecording = () => {
  return (
    <UpdateRecording
      recording={{
        recordingId: 'rec1',
        filename: 'yesterday',
        standupId: 'standup1',
        userId: 'auth0|user1',
        status: 'completed',
        createdAt: 1571999306858,
        updatedAt: 1571999306858,
        transcodedFileKey: `audio/standups/standup1/25-10-2019/auth0|user1/yesterday.mp3`
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

DownloadingUserRecording.story = {
  name: 'downloading'
};

export const PlayingUserRecording = () => {
  return (
    <UpdateRecording
      recording={{
        recordingId: 'rec1',
        filename: 'yesterday',
        standupId: 'standup1',
        userId: 'auth0|user1',
        status: 'completed',
        createdAt: 1571999306858,
        updatedAt: 1571999306858,
        transcodedFileKey: `audio/standups/standup1/25-10-2019/auth0|user1/yesterday.mp3`
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

PlayingUserRecording.story = {
  name: 'playing'
};

export const PausedUserRecording = () => {
  return (
    <UpdateRecording
      recording={{
        recordingId: 'rec1',
        filename: 'yesterday',
        standupId: 'standup1',
        userId: 'auth0|user1',
        status: 'completed',
        createdAt: 1571999306858,
        updatedAt: 1571999306858,
        transcodedFileKey: `audio/standups/standup1/25-10-2019/auth0|user1/yesterday.mp3`
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

PausedUserRecording.story = {
  name: 'paused'
};
