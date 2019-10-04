import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/Button';
import { ListContainer, ListTitle, List, ListItem } from '../components/List';
import { Confirm } from '../components/Modal';

const DeleteButton = styled(Button)`
  color: var(--color-dark-red) !important;

  :hover {
    color: var(--color-red) !important;
  }

  :active {
    color: var(--color-darker-red) !important;
  }
`;

const RecordingListItem = styled(ListItem)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  border-left: 3px solid;
  border-color: ${props =>
    props.isCurrent ? 'var(--color-purple)' : 'transparent'};
`;

RecordingListItem.propTypes = {
  isCurrent: PropTypes.bool.isRequired
};

const RecordingTitle = styled.h4`
  margin: 0.25em 0 0 0;
  text-transform: capitalize;
  color: ${props => (props.isCurrent ? 'inherit' : 'var(--color-grey)')};
`;

RecordingTitle.propTypes = {
  isCurrent: PropTypes.bool.isRequired
};

const InfoText = styled.span`
  color: var(--color-grey);
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

function Recordings({ updatesByQuestionId, dispatch, currentQuestionId }) {
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
    dispatch({
      type: 'DELETE_UPDATE_RECORDING',
      data: {
        id: idToDelete
      }
    });

    setShowConfirm(false);
    setIdToDelete(null);
  };

  return (
    <>
      <ListContainer>
        <ListTitle>Your update</ListTitle>

        <List>
          {Object.keys(updatesByQuestionId).map(id => {
            const update = updatesByQuestionId[id];
            const isCurrent = currentQuestionId === id;
            const hasRecording = Boolean(update.blob);

            return (
              <RecordingListItem
                key={`preview-${update.id}`}
                isCurrent={isCurrent}
              >
                <RecordingTitle isCurrent={isCurrent}>
                  {update.id}
                </RecordingTitle>

                <RecordingAudio>
                  {hasRecording ? (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <audio
                      controls
                      src={window.URL.createObjectURL(update.blob)}
                    ></audio>
                  ) : (
                    <InfoText>No recording.</InfoText>
                  )}

                  <DeleteButton
                    tertiary
                    data-id={update.id}
                    disabled={!isCurrent || !hasRecording}
                    onClick={handleDelete}
                  >
                    <FontAwesomeIcon icon="trash" />
                  </DeleteButton>
                </RecordingAudio>
              </RecordingListItem>
            );
          })}
        </List>
      </ListContainer>

      <Confirm
        show={showConfirm}
        handleCancel={handleCancel}
        handleConfirm={deleteUpdate}
        title="Are you sure you want to delete this update?"
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
  updatesByQuestionId: PropTypes.shape({
    yesterday: PropTypes.shape({
      id: PropTypes.string.isRequired,
      blob: PropTypes.object
    }),
    today: PropTypes.shape({
      id: PropTypes.string.isRequired,
      blob: PropTypes.object
    }),
    blockers: PropTypes.shape({
      id: PropTypes.string.isRequired,
      blob: PropTypes.object
    })
  }),
  dispatch: PropTypes.func.isRequired,
  currentQuestionId: PropTypes.string.isRequired
};

export default Recordings;
