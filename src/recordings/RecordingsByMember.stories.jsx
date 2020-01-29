import React from 'react';
import { action } from '@storybook/addon-actions';

import { PureRecordingsByMember } from './RecordingsByMember';
import { membersMockData, recordingsMockData } from './mock-data';

const downloadFile = action('downloadFile');
const playPauseAudio = action('playPauseAudio');

export default {
  title: 'modules/Recordings/RecordingsByMember',
  component: PureRecordingsByMember,
  parameters: {
    componentSubtitle: 'Recordings grouped by member'
  }
};

export const DefaultUpdateRecordings = () => {
  return (
    <PureRecordingsByMember
      members={membersMockData}
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
  );
};

DefaultUpdateRecordings.story = {
  name: 'default'
};
