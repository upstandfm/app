import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/Button';
import { ListItem } from '../components/List';
import { Input, Description } from '../components/Form';

import { RecordingName } from './Layout';

const PlayPauseButton = styled(Button)`
  width: 40px;
  height: 40px;
  padding: 0;
  color: ${props =>
    props.isSelected ? 'var(--color-light-purple)' : 'var(--color-grey)'};
`;

PlayPauseButton.propTypes = {
  isSelected: PropTypes.bool
};

const DeleteButton = styled(Button)`
  width: 40px;
  height: 40px;
  padding: 0;
  color: var(--color-grey);
`;

const NameInput = styled(Input)`
  width: 100%;
`;

const RecordingDescription = styled(Description)`
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function Recording({
  recording,
  isSelected,
  isPlaying,
  onUpdateRecordingName,
  playPauseAudio,
  onHandleDelete
}) {
  const nameInput = React.createRef();
  const [feedbackText, setFeedbackText] = React.useState('');

  const _validateNameInput = () => {
    const isValid = nameInput.current.checkValidity();

    if (!isValid) {
      setFeedbackText('Invalid character. Use a-z, A-Z, 0-9.');
    } else {
      setFeedbackText('');
    }

    return isValid;
  };

  React.useEffect(() => {
    _validateNameInput();
    nameInput.current.focus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handlePlayPauseRecording = () => {
    playPauseAudio(recording, isPlaying);
  };

  const handleChangeName = e => {
    const name = e.target.value;
    const isValid = _validateNameInput();
    onUpdateRecordingName(recording.id, name, isValid);
  };

  const handleDelete = e => {
    e.stopPropagation();
    onHandleDelete(recording.id);
  };

  const { id, name } = recording;

  const displayName = name.trim() || 'Untitled';
  const helpText = `${isPlaying ? 'pause' : 'play'} recording "${displayName}"`;
  const helpTextDelete = `delete recording "${displayName}"`;
  const descriptionText = 'Max. 70 characters (a-z, A-Z, 0-9).';
  const hasFeedback = Boolean(feedbackText);

  return (
    <ListItem>
      <PlayPauseButton
        tertiary
        aria-label={helpText}
        title={helpText}
        isSelected={isSelected}
        onClick={handlePlayPauseRecording}
      >
        <FontAwesomeIcon icon={isPlaying ? 'pause' : 'play'} size="lg" />
      </PlayPauseButton>

      <RecordingName title={displayName}>
        <NameInput
          ref={nameInput}
          aria-label={displayName}
          type="text"
          placeholder="What's this recording about?"
          data-id={id}
          value={name}
          onChange={handleChangeName}
          maxLength="70"
          pattern="[a-zA-Z0-9 ]*"
        />

        <RecordingDescription
          error={hasFeedback}
          title={hasFeedback ? feedbackText : descriptionText}
        >
          {hasFeedback ? feedbackText : descriptionText}
        </RecordingDescription>
      </RecordingName>

      <DeleteButton
        tertiary
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
