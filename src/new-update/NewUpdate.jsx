import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button, { ExitButton } from '../components/Button';
import { Confirm } from '../components/Modal';
import AudioRecorder from '../components/AudioRecorder';
import { useSnackbar } from '../components/Snackbar';
import AudioPlayer, { AudioPlayerProvider } from '../components/AudioPlayer';

import {
  Container,
  Header,
  Main,
  Wrapper,
  Player,
  Actions,
  Preview
} from './Layout';

import Permission from './Permission';
import Recordings from './Recordings';
import UploadRecordings from './UploadRecordings';

import updatesReducer, { defaultUpdatesState } from './reducer';
import useGetUserMedia from './use-get-user-media';

const Title = styled.h2`
  display: inline-block;
  vertical-align: middle;
  margin: 0 0.5em 0 0;
  color: var(--color-darkest-purple);
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 480px) {
    margin: 0;
  }
`;

const Subtitle = styled.p`
  color: var(--color-grey);
  letter-spacing: 1px;
  margin: 2em 0 0 0;
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

  const [, snackbarDispatch] = useSnackbar();

  const [showConfirm, setShowConfirm] = React.useState(false);
  const [isPublishing, setIsPublishing] = React.useState(false);

  const navigateToStandup = () => {
    navigate(`/standups/${standupId}`);
  };

  const recordingIds = Object.keys(updatesState);
  const hasRecordings = Boolean(recordingIds.length);
  const hasUploadedAllFiles = hasRecordings
    ? recordingIds.every(id => updatesState[id].isUploaded)
    : false;

  React.useEffect(
    function showSuccessMessage() {
      if (!hasUploadedAllFiles) {
        return;
      }

      snackbarDispatch({
        type: 'ENQUEUE_SNACKBAR_MSG',
        data: {
          type: 'success',
          title: 'Published update',
          text:
            'Your recording(s) are being processed, and will be available shortly.'
        }
      });
    },
    [hasUploadedAllFiles] // eslint-disable-line react-hooks/exhaustive-deps
  );

  React.useEffect(
    function redirectWhenDoneUploading() {
      if (!hasUploadedAllFiles) {
        return;
      }

      // Give some time for the progress animation(s) to finish
      setTimeout(navigateToStandup, 750);
    },
    [hasUploadedAllFiles] // eslint-disable-line react-hooks/exhaustive-deps
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
    <AudioPlayerProvider>
      <Container>
        <Header>
          <Title>Publish a new update</Title>

          <ExitButton aria-label="exit" title="exit" onClick={handleExit} />
        </Header>

        <Main>
          <Wrapper>
            {!userMediaStream ? (
              <Permission
                isLoading={isGettingPermission}
                err={permissionErr}
                handleGetPermission={handleGetPermission}
              />
            ) : (
              <>
                <AudioRecorder
                  stream={userMediaStream}
                  onNewRecording={onNewRecording}
                  isDisabled={isPublishing}
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
          </Wrapper>
        </Main>

        <Player>
          <AudioPlayer />
        </Player>
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
    </AudioPlayerProvider>
  );
}

NewUpdate.propTypes = {
  standupId: PropTypes.string
};

export default NewUpdate;
