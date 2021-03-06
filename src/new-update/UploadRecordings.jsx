import React from 'react';
import PropTypes from 'prop-types';

import { ListContainer } from '../components/List';

import { RecordingsList, RecordingListTitle } from './Layout';
import UploadRecording from './UploadRecording';

function UploadRecordings({ channelId, recordingsState, onUploadedFile }) {
  const recordingIds = Object.keys(recordingsState);

  return (
    <ListContainer>
      <RecordingListTitle>Uploading ({recordingIds.length})</RecordingListTitle>

      <RecordingsList>
        {recordingIds.map(id => {
          return (
            <UploadRecording
              key={id}
              channelId={channelId}
              recording={recordingsState[id]}
              onUploadedFile={onUploadedFile}
            />
          );
        })}
      </RecordingsList>
    </ListContainer>
  );
}

UploadRecordings.propTypes = {
  channelId: PropTypes.string.isRequired,
  recordingsState: PropTypes.object.isRequired,
  onUploadedFile: PropTypes.func.isRequired
};

export default UploadRecordings;
