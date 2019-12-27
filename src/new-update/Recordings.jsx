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

import { Name, NameInput } from './Recording';

const RecordingsList = styled(List)`
  padding: 0;
  overflow: auto;
  height: 240px;
`;

const RecordingListTitle = styled(ListTitle)`
  padding: 1em;
`;

const PlayPauseButton = styled(Button)`
  padding: 0.25em 0.5em;
  color: ${props =>
    props.isSelected ? 'var(--color-light-purple)' : 'var(--color-grey)'};
`;

PlayPauseButton.propTypes = {
  isSelected: PropTypes.bool
};

const DeleteButton = styled(Button)`
  padding: 0.25em 0.5em;
  color: var(--color-grey);
`;

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

  const handleChangeName = e => {
    const id = e.currentTarget.getAttribute('data-id');
    const name = e.target.value;
    onUpdateRecordingName(id, name);
  };

  return (
    <>
      <ListContainer>
        <RecordingListTitle>Recordings ({updateIds.length})</RecordingListTitle>

        <RecordingsList>
          {updateIds.length === 0 && <ListEmpty>No recordings yet.</ListEmpty>}

          {updateIds.map(id => {
            const { name } = updatesState[id];
            const isSelected = id === audioPlayerState.playingFile.id;
            const isPlaying = isSelected && audioPlayerState.isPlaying;
            const helpText = `${
              isPlaying ? 'pause' : 'play'
            } recording ${name}`;
            const helpTextDelete = `delete recording ${name}`;

            return (
              <ListItem key={id}>
                <PlayPauseButton
                  tertiary
                  data-id={id}
                  data-is-playing={isPlaying ? true : ''}
                  aria-label={helpText}
                  title={helpText}
                  isSelected={isSelected}
                  onClick={handlePlayPauseRecording}
                >
                  <FontAwesomeIcon
                    icon={isPlaying ? 'pause' : 'play'}
                    size="lg"
                  />
                </PlayPauseButton>

                <Name>
                  <NameInput
                    type="text"
                    placeholder="What's this recording about?"
                    data-id={id}
                    value={name}
                    onChange={handleChangeName}
                  />
                </Name>

                <DeleteButton
                  tertiary
                  data-id={id}
                  onClick={handleDelete}
                  aria-label={helpTextDelete}
                  title={helpTextDelete}
                >
                  <FontAwesomeIcon icon="trash" />
                </DeleteButton>
              </ListItem>
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
