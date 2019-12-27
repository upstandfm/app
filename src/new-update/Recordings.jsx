import React from 'react';
import PropTypes from 'prop-types';

import { ListContainer, ListEmpty } from '../components/List';
import { Confirm } from '../components/Modal';

import { RecordingsList, RecordingListTitle } from './Layout';
import Recording from './Recording';

function Recordings({
  updatesState,
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

  const updateIds = Object.keys(updatesState);

  return (
    <>
      <ListContainer>
        <RecordingListTitle>Recordings ({updateIds.length})</RecordingListTitle>

        <RecordingsList>
          {updateIds.length === 0 && <ListEmpty>No recordings yet.</ListEmpty>}

          {updateIds.map(id => {
            const isSelected = id === audioPlayerState.playingFile.id;
            const isPlaying = isSelected && audioPlayerState.isPlaying;

            return (
              <Recording
                key={id}
                recording={updatesState[id]}
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
  updatesState: PropTypes.object.isRequired,
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
