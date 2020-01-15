import React from 'react';
import { action } from '@storybook/addon-actions';

import { PureUpdateRecordings } from './UpdateRecordings';
import { membersMockData, recordingsMockData } from './mock-data';

const downloadFile = action('downloadFile');
const playPauseAudio = action('playPauseAudio');

export default {
  title: 'modules/UpdateRecordings',
  component: PureUpdateRecordings,
  parameters: {
    componentSubtitle:
      'Component that shows all standup members update recordings'
  }
};

export const DefaultUpdateRecordings = () => {
  return (
    <PureUpdateRecordings
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
