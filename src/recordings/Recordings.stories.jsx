import React from 'react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import { PureRecordings } from './Recordings';
import { membersByIdMockData, recordingsMockData } from './mock-data';

const downloadFile = action('downloadFile');
const playPauseAudio = action('playPauseAudio');

const Container = styled.div`
  border: 1px dashed var(--color-light-grey);
  background-color: var(--color-white);
`;

export default {
  title: 'modules/Recordings',
  component: PureRecordings,
  parameters: {
    componentSubtitle: 'Update recordings'
  }
};

export const DefaultRecordings = () => {
  return (
    <Container>
      <PureRecordings
        membersById={membersByIdMockData}
        recordings={recordingsMockData}
        audioPlayerState={{
          playingFile: {
            id: null,
            title: ''
          },
          isPlaying: false,
          files: {}
        }}
        downloadProgressState={{}}
        downloadFile={downloadFile}
        playPauseAudio={playPauseAudio}
      />
    </Container>
  );
};

DefaultRecordings.story = {
  name: 'default'
};

export const EmptyRecordings = () => {
  return (
    <Container>
      <PureRecordings
        membersById={membersByIdMockData}
        recordings={[]}
        audioPlayerState={{
          playingFile: {
            id: null,
            title: ''
          },
          isPlaying: false,
          files: {}
        }}
        downloadProgressState={{}}
        downloadFile={downloadFile}
        playPauseAudio={playPauseAudio}
      />
    </Container>
  );
};

EmptyRecordings.story = {
  name: 'empty'
};
