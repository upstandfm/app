import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/Button';
import {
  ListContainer,
  ListTitle,
  List,
  ListEmpty,
  ListItem
} from '../components/List';
import { Confirm } from '../components/Modal';

const RecordingsList = styled(List)`
  overflow: auto;
  height: 250px;
`;

const RecordingListItem = styled(ListItem)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-gap: 0;
`;

const RecordingTitle = styled.h4`
  margin: 0;
`;

const RecordingAudio = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 0.5em;
  align-items: center;
  height: 45px;

  audio {
    width: 100%;
  }
`;

function Recordings({
  updatesState,
  audioPlayerState,
  playPauseAudio,
  onDeleteUpdate
}) {
  const [idToDelete, setIdToDelete] = React.useState(null);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleDelete = e => {
    setIdToDelete(e.currentTarget.getAttribute('data-id'));
    setShowConfirm(true);
  };

  const deleteUpdate = () => {
    onDeleteUpdate(idToDelete);
    setShowConfirm(false);
    setIdToDelete(null);
  };

  const updateIds = Object.keys(updatesState);

  const handlePlayPauseAudio = e => {
    const id = e.currentTarget.getAttribute('data-id');

    const recording = {
      id,
      name: id
    };

    const isPlaying = Boolean(e.currentTarget.getAttribute('data-is-playing'));

    playPauseAudio(recording, isPlaying);
  };

  return (
    <>
      <ListContainer>
        <ListTitle>Recordings ({updateIds.length})</ListTitle>

        <RecordingsList>
          {updateIds.length === 0 && <ListEmpty>No recordings yet.</ListEmpty>}

          {updateIds.map(_id => {
            const { id } = updatesState[_id];

            const isSelected = id === audioPlayerState.playingFile.id;
            const isPlaying = isSelected && audioPlayerState.isPlaying;

            return (
              <RecordingListItem
                key={`preview-${id}`}
                data-id={id}
                data-is-playing={isPlaying ? true : ''}
                onClick={handlePlayPauseAudio}
              >
                <RecordingTitle>{id}</RecordingTitle>

                <RecordingAudio>
                  <div>{isPlaying ? 'playing' : 'paused'}</div>

                  <Button
                    tertiary
                    data-id={id}
                    onClick={handleDelete}
                    aria-label="delete recording"
                    title="delete recording"
                  >
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </RecordingAudio>
              </RecordingListItem>
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
  playPauseAudio: PropTypes.func.isRequired,
  onDeleteUpdate: PropTypes.func.isRequired
};

export default Recordings;
