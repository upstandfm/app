import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/Button';
import { ListContainer, ListTitle, List, ListEmpty } from '../components/List';
import { Confirm } from '../components/Modal';

import { Recording, PlayState, Title } from './Recording';

const RecordingsList = styled(List)`
  overflow: auto;
  height: 265px;
`;

const DeleteButton = styled(Button)`
  padding: 0.25em 0.5em;
  color: var(--color-grey);
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
    e.stopPropagation();

    const id = e.currentTarget.getAttribute('data-id');
    setIdToDelete(id);
    setShowConfirm(true);
  };

  const deleteUpdate = () => {
    onDeleteUpdate(idToDelete);
    setShowConfirm(false);
    setIdToDelete(null);
  };

  const updateIds = Object.keys(updatesState);

  const handlePlayPauseRecording = e => {
    const id = e.currentTarget.getAttribute('data-id');

    const recording = {
      id,
      name: id
    };

    const isPlaying = Boolean(e.currentTarget.getAttribute('data-is-playing'));

    playPauseAudio(recording, isPlaying);
  };

  const handleKeyPress = e => {
    if (e.key !== 'Enter') {
      return;
    }

    handlePlayPauseRecording(e);
  };

  return (
    <>
      <ListContainer>
        <ListTitle>Recordings ({updateIds.length})</ListTitle>

        <RecordingsList>
          {updateIds.length === 0 && <ListEmpty>No recordings yet.</ListEmpty>}

          {updateIds.map(id => {
            const isSelected = id === audioPlayerState.playingFile.id;
            const isPlaying = isSelected && audioPlayerState.isPlaying;
            const helpText = `${isPlaying ? 'pause' : 'play'} recording ${id}`;
            const helpTextDelete = `delete recording ${id}`;

            return (
              <Recording
                tabIndex="0"
                key={`preview-${id}`}
                data-id={id}
                data-is-playing={isPlaying ? true : ''}
                aria-label={helpText}
                title={helpText}
                isSelected={isSelected}
                onClick={handlePlayPauseRecording}
                onKeyDown={handleKeyPress}
              >
                <PlayState isPlaying={isPlaying} />

                <Title>{id}</Title>

                <DeleteButton
                  tertiary
                  data-id={id}
                  onClick={handleDelete}
                  aria-label={helpTextDelete}
                  title={helpTextDelete}
                >
                  <FontAwesomeIcon icon="trash" />
                </DeleteButton>
              </Recording>
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
