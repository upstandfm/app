import React from 'react';
import PropTypes from 'prop-types';

import { ListContainer, ListEmpty } from '../components/List';
import { Confirm } from '../components/Modal';

import { RecordingsList, RecordingListTitle } from './Layout';
import Recording from './Recording';

function Recordings({
  recordingsState,
  audioPlayerState,
  onUpdateRecordingName,
  playPauseAudio,
  onDeleteUpdate
}) {
  const [idToDelete, setIdToDelete] = React.useState(null);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const onHandleDelete = id => {
    setIdToDelete(id);
    setShowConfirm(true);
  };

  const deleteUpdate = () => {
    onDeleteUpdate(idToDelete);
    setShowConfirm(false);
    setIdToDelete(null);
  };

  const recordingIds = Object.keys(recordingsState);

  return (
    <>
      <ListContainer>
        <RecordingListTitle>
          Recordings ({recordingIds.length})
        </RecordingListTitle>

        <RecordingsList>
          {recordingIds.length === 0 && (
            <ListEmpty>No recordings yet.</ListEmpty>
          )}

          {recordingIds.map(id => {
            const isSelected = id === audioPlayerState.playingFile.id;
            const isPlaying = isSelected && audioPlayerState.isPlaying;

            return (
              <Recording
                key={id}
                recording={recordingsState[id]}
                isSelected={isSelected}
                isPlaying={isPlaying}
                onUpdateRecordingName={onUpdateRecordingName}
                playPauseAudio={playPauseAudio}
                onHandleDelete={onHandleDelete}
              />
            );
          })}
        </RecordingsList>
      </ListContainer>

      <Confirm
        show={showConfirm}
        handleCancel={handleCancel}
        handleConfirm={deleteUpdate}
        title={
          <>
            Are you sure you want to <b>delete</b> this recording{' '}
            <b>permanently</b>?
          </>
        }
      />
    </>
  );
}

Recordings.propTypes = {
  recordingsState: PropTypes.object.isRequired,
  audioPlayerState: PropTypes.shape({
    playingFile: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string
    }),
    isPlaying: PropTypes.bool.isRequired,
    files: PropTypes.object.isRequired
  }),
  onUpdateRecordingName: PropTypes.func.isRequired,
  playPauseAudio: PropTypes.func.isRequired,
  onDeleteUpdate: PropTypes.func.isRequired
};

export default Recordings;
