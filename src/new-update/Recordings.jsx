import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/Button';
import { ListContainer, List, ListEmpty, ListItem } from '../components/List';
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

function Recordings({ updatesState, onDeleteUpdate }) {
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

  return (
    <>
      <ListContainer>
        <RecordingsList>
          {updateIds.length === 0 && <ListEmpty>No recordings yet.</ListEmpty>}

          {updateIds.map(id => {
            const update = updatesState[id];

            return (
              <RecordingListItem key={`preview-${update.id}`}>
                <RecordingTitle>{update.id}</RecordingTitle>

                <RecordingAudio>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <audio
                    controls
                    src={window.URL.createObjectURL(update.blob)}
                  ></audio>

                  <Button
                    tertiary
                    data-id={update.id}
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
        title="Are you sure you want to delete this recording?"
        message={
          <>
            You&apos;ll have to record a new update for <b>{idToDelete}</b>{' '}
            after deleting it.
          </>
        }
      />
    </>
  );
}

Recordings.propTypes = {
  updatesState: PropTypes.object.isRequired,
  onDeleteUpdate: PropTypes.func.isRequired
};

export default Recordings;
