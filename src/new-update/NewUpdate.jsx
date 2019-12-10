import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  const [isPublishing, setIsPublishing] = React.useState(false);

  const navigateToStandup = () => {
    navigate(`/standups/${standupId}`);
  };

  const hasUploadedAllFiles = Object.keys(updatesState).every(
    id => updatesState[id].isUploaded
  );

  React.useEffect(
    function redirectWhenDoneUploading() {
      if (!isPublishing) {
        return;
      }

      if (hasUploadedAllFiles) {
        // FIXME: is this the best way to do this?
        // Give some time for the progress animation(s) to finish
        // setTimeout(navigateToStandup, 500);
      }
    },
    [isPublishing, hasUploadedAllFiles] // eslint-disable-line react-hooks/exhaustive-deps
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

  const onUploadedFile = id => {
    updatesDispatch({
      type: 'UPLOADED_UPDATE_RECORDING',
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

  const handlePublish = () => {
    setIsPublishing(true);
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

                {isPublishing ? (
                  <UploadRecordings
                    standupId={standupId}
                    updatesState={updatesState}
                    onUploadedFile={onUploadedFile}
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
              <Button
                disabled={
                  Object.keys(updatesState).length === 0 || isPublishing
                }
                onClick={handlePublish}
              >
                {isPublishing ? (
                  <>
                    <FontAwesomeIcon icon="circle-notch" size="sm" spin />{' '}
                    Publishing..
                  </>
                ) : (
                  'Publish'
                )}
              </Button>
            </Actions>
          </>
        )}
      </Container>

      <Confirm
        show={showConfirm}
        handleCancel={handleCancel}
        handleConfirm={navigateToStandup}
        title={
          <>
            Are you sure you want to <b>exit</b>?
          </>
        }
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
