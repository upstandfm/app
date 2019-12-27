import React from 'react';
import PropTypes from 'prop-types';

import { ListContainer } from '../components/List';

import { RecordingsList, RecordingListTitle } from './Layout';
import UploadRecording from './UploadRecording';

function UploadRecordings({ standupId, updatesState, onUploadedFile }) {
  const updateIds = Object.keys(updatesState);

  return (
    <ListContainer>
      <RecordingListTitle>Uploading ({updateIds.length})</RecordingListTitle>

      <RecordingsList>
        {updateIds.map(id => {
          return (
            <UploadRecording
              key={id}
              standupId={standupId}
              update={updatesState[id]}
              onUploadedFile={onUploadedFile}
            />
          );
        })}
      </RecordingsList>
    </ListContainer>
  );
}

UploadRecordings.propTypes = {
  standupId: PropTypes.string.isRequired,
  updatesState: PropTypes.object.isRequired,
  onUploadedFile: PropTypes.func.isRequired
};

export default UploadRecordings;
