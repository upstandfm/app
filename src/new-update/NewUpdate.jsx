import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import styled from 'styled-components';

import Button, { ExitButton } from '../components/Button';
import { Confirm } from '../components/Modal';
import AudioRecorder from '../components/AudioRecorder';

import { Container, Header, Main, Actions, Preview } from './Layout';
import Permission from './Permission';
import Recordings from './Recordings';
import UploadRecordings from './UploadRecordings';

import updatesReducer, { defaultUpdatesState } from './reducer';
import useGetUserMedia from './use-get-user-media';

const Title = styled.h1`
  font-size: 1.5em;
`;

const Subtitle = styled.p`
  color: var(--color-grey);
  letter-spacing: 1px;
  margin: 0 0 0.5em 0;
  text-transform: uppercase;
`;

function NewUpdate({ standupId }) {
  const [updatesState, updatesDispatch] = React.useReducer(
    updatesReducer,
    defaultUpdatesState
  );

  const [
    getUserMedia,
    isGettingPermission,
    permissionErr,
    userMediaStream
  ] = useGetUserMedia();

  const [showConfirm, setShowConfirm] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const navigateToStandup = () => {
    navigate(`/standups/${standupId}`);
  };

  const updateIdsWithRecording = Object.keys(updatesState).filter(id =>
    Boolean(updatesState[id].blob)
  );
  const isDoneUploading = updateIdsWithRecording.every(
    id => updatesState[id].isUploaded
  );

  React.useEffect(
    function redirectWhenDoneUploading() {
      if (!isSaving) {
        return;
      }

      if (isDoneUploading) {
        // Give some time for the progress animation(s) to finish
        setTimeout(navigateToStandup, 500);
      }
    },
    [isSaving, isDoneUploading] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Helpers

  const onNewRecording = blob => {
    updatesDispatch({
      type: 'NEW_UPDATE_RECORDING',
      data: {
        blob
      }
    });
  };

  const onDeleteUpdate = id => {
    updatesDispatch({
      type: 'DELETE_UPDATE_RECORDING',
      data: {
        id
      }
    });
  };

  // Event handlers

  const handleExit = () => {
    const hasProgress = Object.values(updatesState).some(update =>
      Boolean(update.blob)
    );
    if (hasProgress) {
      setShowConfirm(true);
      return;
    }

    navigateToStandup();
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleGetPermission = () => {
    getUserMedia({ audio: true });
  };

  const handleSave = () => {
    setIsSaving(true);
  };

  return (
    <>
      <Container>
        <Header>
          <Title>Publish a new update</Title>

          <ExitButton aria-label="exit" title="exit" onClick={handleExit} />
        </Header>

        {!userMediaStream ? (
          <Permission
            isLoading={isGettingPermission}
            err={permissionErr}
            handleGetPermission={handleGetPermission}
          />
        ) : (
          <>
            <Main>
              <AudioRecorder
                stream={userMediaStream}
                onNewRecording={onNewRecording}
              />

              <Preview>
                <Subtitle>Preview</Subtitle>

                {isSaving ? (
                  <UploadRecordings
                    standupId={standupId}
                    updatesByQuestionId={updatesState}
                    dispatch={updatesDispatch}
                  />
                ) : (
                  <Recordings
                    updatesState={updatesState}
                    onDeleteUpdate={onDeleteUpdate}
                  />
                )}
              </Preview>
            </Main>

            <Actions>
              <Button disabled onClick={handleSave}>
                Publish
              </Button>
            </Actions>
          </>
        )}
      </Container>

      <Confirm
        show={showConfirm}
        handleCancel={handleCancel}
        handleConfirm={navigateToStandup}
        title="Are you sure you want to exit?"
        message={
          <>
            Your progress will be <b>lost</b> if you exit now.
          </>
        }
      />
    </>
  );
}

NewUpdate.propTypes = {
  standupId: PropTypes.string
};

export default NewUpdate;
