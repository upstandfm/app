import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/Button';
import { ListItem } from '../components/List';
import { Input } from '../components/Form';

import { RecordingName } from './Layout';

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

const NameInput = styled(Input)`
  width: 100%;
`;

export const Actions = styled.div``;

function Recording({
  recording,
  isSelected,
  isPlaying,
  onUpdateRecordingName,
  playPauseAudio,
  onHandleDelete
}) {
  const handlePlayPauseRecording = () => {
    playPauseAudio(recording, isPlaying);
  };

  const handleChangeName = e => {
    const name = e.target.value;
    onUpdateRecordingName(recording.id, name);
  };

  const handleDelete = e => {
    e.stopPropagation();
    onHandleDelete(recording.id);
  };

  const { id, name } = recording;

  const displayName = name.trim();
  const helpText = `${isPlaying ? 'pause' : 'play'} recording ${displayName}`;
  const helpTextDelete = `delete recording ${displayName}`;

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
        <FontAwesomeIcon icon={isPlaying ? 'pause' : 'play'} size="lg" />
      </PlayPauseButton>

      <RecordingName title={displayName}>
        <NameInput
          type="text"
          placeholder="What's this recording about?"
          data-id={id}
          value={name}
          onChange={handleChangeName}
        />
      </RecordingName>

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
}

Recording.propTypes = {
  recording: PropTypes.shape({
    id: PropTypes.string.isRequired,
    blob: PropTypes.object.isRequired,
    name: PropTypes.string,
    isUploaded: PropTypes.bool.isRequired
  }),
  isSelected: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onUpdateRecordingName: PropTypes.func.isRequired,
  playPauseAudio: PropTypes.func.isRequired,
  onHandleDelete: PropTypes.func.isRequired
};

export default Recording;
