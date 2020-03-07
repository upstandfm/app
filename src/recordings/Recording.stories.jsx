import React from 'react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import Recording from './Recording';

const playPauseAudio = action('playPauseAudio');
const downloadFile = action('downloadFile');

const Container = styled.div`
  border: 1px dashed var(--color-light-grey);
  background-color: var(--color-white);
`;

const nowIso = new Date().toISOString();

const recording = {
  id: 'XQyaVFWe',
  createdBy: 'auth|user1',
  createdAt: nowIso,
  updatedAt: nowIso,
  name: 'Yesterday',
  transcodingStatus: 'completed',
  transcodedFileKey: `audio/P0Xz6ty/ZXor4g6/XQyaVFWe.mp3`
};

const member = {
  id: 'auth|user1',
  createdAt: nowIso,
  updatedAt: nowIso,
  fullName: 'Daniël Illouz',
  email: 'daniel@upstand.fm',
  avatarUrl: 'https://avatars1.githubusercontent.com/u/6201287'
};

export default {
  title: 'modules/Recordings/Recording',
  component: Recording,
  parameters: {
    componentSubtitle: 'Recording component'
  }
};

export const DefaultUpdateRecording = () => {
  return (
    <Container>
      <Recording
        recording={recording}
        member={member}
        isSelected={false}
        hasFile={false}
        downloadFile={downloadFile}
        downloadProgress={undefined}
        playPauseAudio={playPauseAudio}
        isPlaying={false}
      />
    </Container>
  );
};

DefaultUpdateRecording.story = {
  name: 'default'
};

export const TranscodingUpdateRecording = () => {
  return (
    <Container>
      <Recording
        recording={{
          ...recording,
          transcodingStatus: 'transcoding'
        }}
        member={member}
        isSelected={false}
        hasFile={false}
        downloadFile={downloadFile}
        downloadProgress={undefined}
        playPauseAudio={playPauseAudio}
        isPlaying={false}
      />
    </Container>
  );
};

TranscodingUpdateRecording.story = {
  name: 'transcoding'
};

export const ErrorUpdateRecording = () => {
  return (
    <Container>
      <Recording
        recording={{
          ...recording,
          transcodingStatus: 'error'
        }}
        member={member}
        isSelected={false}
        hasFile={false}
        downloadFile={downloadFile}
        downloadProgress={undefined}
        playPauseAudio={playPauseAudio}
        isPlaying={false}
      />
    </Container>
  );
};

ErrorUpdateRecording.story = {
  name: 'error'
};

export const UntitledUpdateRecording = () => {
  return (
    <Container>
      <Recording
        recording={{
          ...recording,
          name: undefined
        }}
        member={member}
        isSelected={false}
        hasFile={false}
        downloadFile={downloadFile}
        downloadProgress={undefined}
        playPauseAudio={playPauseAudio}
        isPlaying={false}
      />
    </Container>
  );
};

UntitledUpdateRecording.story = {
  name: 'untitled'
};

export const DownloadingUpdateRecording = () => {
  return (
    <Container>
      <Recording
        recording={recording}
        member={member}
        isSelected={false}
        hasFile={false}
        downloadFile={downloadFile}
        downloadProgress={33}
        playPauseAudio={playPauseAudio}
        isPlaying={false}
      />
    </Container>
  );
};

DownloadingUpdateRecording.story = {
  name: 'downloading'
};

export const PlayingUpdateRecording = () => {
  return (
    <Container>
      <Recording
        recording={recording}
        member={member}
        isSelected={true}
        hasFile={true}
        downloadFile={downloadFile}
        downloadProgress={100}
        playPauseAudio={playPauseAudio}
        isPlaying={true}
      />
    </Container>
  );
};

PlayingUpdateRecording.story = {
  name: 'playing'
};

export const PausedUpdateRecording = () => {
  return (
    <Container>
      <Recording
        recording={recording}
        member={member}
        isSelected={true}
        hasFile={true}
        downloadFile={downloadFile}
        downloadProgress={100}
        playPauseAudio={playPauseAudio}
        isPlaying={false}
      />
    </Container>
  );
};

PausedUpdateRecording.story = {
  name: 'paused'
};
