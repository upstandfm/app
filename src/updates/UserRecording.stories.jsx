import React from 'react';
import { action } from '@storybook/addon-actions';

import UserRecording from './UserRecording';

const playPauseAudio = action('playPauseAudio');

export default {
  title: 'screens|Standup/Updates/UserRecording',
  component: UserRecording,
  parameters: {
    componentSubtitle: 'User recording component'
  }
};

export const DefaultUserRecording = () => {
  return (
    <UserRecording
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
      playPauseAudio={playPauseAudio}
      audioPlayerState={{
        playingFile: {
          fileId: null,
          fileKey: null
        },
        isPlaying: false,
        downloadProgress: {},
        files: {}
      }}
    />
  );
};

DefaultUserRecording.story = {
  name: 'default'
};

export const TranscodingUserRecording = () => {
  return (
    <UserRecording
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
      playPauseAudio={playPauseAudio}
      audioPlayerState={{
        playingFile: {
          fileId: null,
          fileKey: null
        },
        isPlaying: false,
        downloadProgress: {},
        files: {}
      }}
    />
  );
};

TranscodingUserRecording.story = {
  name: 'transcoding'
};

export const ErrorUserRecording = () => {
  return (
    <UserRecording
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
      playPauseAudio={playPauseAudio}
      audioPlayerState={{
        playingFile: {
          fileId: null,
          fileKey: null
        },
        isPlaying: false,
        downloadProgress: {},
        files: {}
      }}
    />
  );
};

ErrorUserRecording.story = {
  name: 'error'
};

export const DownloadingUserRecording = () => {
  return (
    <UserRecording
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
      playPauseAudio={playPauseAudio}
      audioPlayerState={{
        playingFile: {
          fileId: 'rec1',
          fileKey:
            'audio/standups/standup1/25-10-2019/auth0|user1/yesterday.mp3'
        },
        isPlaying: true,
        downloadProgress: {
          rec1: {
            isDownloading: true,
            progress: 33
          }
        },
        files: {}
      }}
    />
  );
};

DownloadingUserRecording.story = {
  name: 'downloading'
};

export const PlayingUserRecording = () => {
  return (
    <UserRecording
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
      playPauseAudio={playPauseAudio}
      audioPlayerState={{
        playingFile: {
          fileId: 'rec1',
          fileKey:
            'audio/standups/standup1/25-10-2019/auth0|user1/yesterday.mp3'
        },
        isPlaying: true,
        downloadProgress: {
          rec1: {
            isDownloading: false,
            progress: 100
          }
        },
        files: {
          rec1:
            'blob:http://localhost:9009/e0d66d43-4fc2-da43-8147-aa47eb99f774'
        }
      }}
    />
  );
};

PlayingUserRecording.story = {
  name: 'playing'
};

export const PausedUserRecording = () => {
  return (
    <UserRecording
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
      playPauseAudio={playPauseAudio}
      audioPlayerState={{
        playingFile: {
          fileId: 'rec1',
          fileKey:
            'audio/standups/standup1/25-10-2019/auth0|user1/yesterday.mp3'
        },
        isPlaying: false,
        downloadProgress: {
          rec1: {
            isDownloading: false,
            progress: 100
          }
        },
        files: {
          rec1:
            'blob:http://localhost:9009/e0d66d43-4fc2-da43-8147-aa47eb99f774'
        }
      }}
    />
  );
};

PausedUserRecording.story = {
  name: 'paused'
};
