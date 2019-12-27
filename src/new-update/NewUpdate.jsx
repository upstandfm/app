import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import shortid from 'shortid';

import Button, { BackButton } from '../components/Button';
import { Confirm } from '../components/Modal';
import AudioRecorder from '../components/AudioRecorder';
import { useSnackbar } from '../components/Snackbar';
import AudioPlayer, { useAudioPlayer } from '../components/AudioPlayer';

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

import recordingsReducer, { defaultRecordingsState } from './reducer';
import useGetUserMedia from './use-get-user-media';

export function PureNewUpdate({
  userMediaStream,
  isGettingPermission,
  permissionErr,
  handleGetPermission,
  standupId,
  recordingsState,
  audioPlayerState,
  playPauseAudio,
  isPublishing,
  onNewRecording,
  onUpdateRecordingName,
  onDeleteUpdate,
  handlePublish,
  onUploadedFile
}) {
  if (!userMediaStream) {
    return (
      <Permission
        isLoading={isGettingPermission}
        err={permissionErr}
        handleGetPermission={handleGetPermission}
      />
    );
  }

  return (
    <>
      <AudioRecorder
        isDisabled={isPublishing}
        stream={userMediaStream}
        onNewRecording={onNewRecording}
      />

      <Preview>
        <Subtitle>Preview</Subtitle>

        {isPublishing ? (
          <UploadRecordings
            standupId={standupId}
            recordingsState={recordingsState}
            onUploadedFile={onUploadedFile}
          />
        ) : (
          <Recordings
            recordingsState={recordingsState}
            audioPlayerState={audioPlayerState}
            onUpdateRecordingName={onUpdateRecordingName}
            playPauseAudio={playPauseAudio}
            onDeleteUpdate={onDeleteUpdate}
          />
        )}
      </Preview>

      <Actions>
        <Button
          disabled={Object.keys(recordingsState).length === 0 || isPublishing}
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
  );
}

PureNewUpdate.propTypes = {
  userMediaStream: PropTypes.object,
  isGettingPermission: PropTypes.bool.isRequired,
  permissionErr: PropTypes.object,
  handleGetPermission: PropTypes.func.isRequired,
  standupId: PropTypes.string.isRequired,
  recordingsState: PropTypes.object.isRequired,
  audioPlayerState: PropTypes.object.isRequired,
  playPauseAudio: PropTypes.func.isRequired,
  isPublishing: PropTypes.bool.isRequired,
  onNewRecording: PropTypes.func.isRequired,
  onUpdateRecordingName: PropTypes.func.isRequired,
  onDeleteUpdate: PropTypes.func.isRequired,
  handlePublish: PropTypes.func.isRequired,
  onUploadedFile: PropTypes.func.isRequired
};

const Title = styled.h2`
  display: inline-block;
  vertical-align: middle;
  margin: 0 0 0 0.25em;
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
  const [audioPlayerState, audioPlayerDispatch] = useAudioPlayer();

  const [recordingsState, recordingsDispatch] = React.useReducer(
    recordingsReducer,
    defaultRecordingsState
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

  const recordingIds = Object.keys(recordingsState);
  const hasRecordings = Boolean(recordingIds.length);
  const hasUploadedAllFiles = hasRecordings
    ? recordingIds.every(id => recordingsState[id].isUploaded)
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
    const id = shortid.generate();

    audioPlayerDispatch({
      type: 'LOAD_AUDIO_FILE',
      data: {
        id,
        url: URL.createObjectURL(blob)
      }
    });

    recordingsDispatch({
      type: 'NEW_UPDATE_RECORDING',
      data: {
        id,
        blob
      }
    });
  };

  const onUpdateRecordingName = (id, name) => {
    recordingsDispatch({
      type: 'UPDATE_RECORDING_NAME',
      data: {
        id,
        name
      }
    });
  };

  const onDeleteUpdate = id => {
    audioPlayerDispatch({
      type: 'UNLOAD_AUDIO_FILE',
      data: {
        id
      }
    });

    recordingsDispatch({
      type: 'DELETE_UPDATE_RECORDING',
      data: {
        id
      }
    });
  };

  const onUploadedFile = id => {
    recordingsDispatch({
      type: 'UPLOADED_UPDATE_RECORDING',
      data: {
        id
      }
    });
  };

  // Event handlers

  const handleExit = () => {
    const hasProgress = Object.values(recordingsState).some(update =>
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

  const playPauseAudio = (recording, isPlaying) => {
    audioPlayerDispatch({
      type: isPlaying ? 'PAUSE_AUDIO' : 'PLAY_AUDIO',
      data: {
        id: recording.id,
        title: recording.name
      }
    });
  };

  return (
    <>
      <Container>
        <Header>
          <BackButton
            aria-label="go back to standup"
            title="go back to standup"
            onClick={handleExit}
          />

          <Title>Publish a new update</Title>
        </Header>

        <Main>
          <Wrapper>
            <PureNewUpdate
              userMediaStream={userMediaStream}
              isGettingPermission={isGettingPermission}
              permissionErr={permissionErr}
              handleGetPermission={handleGetPermission}
              standupId={standupId}
              recordingsState={recordingsState}
              audioPlayerState={audioPlayerState}
              playPauseAudio={playPauseAudio}
              isPublishing={isPublishing}
              onNewRecording={onNewRecording}
              onUpdateRecordingName={onUpdateRecordingName}
              onDeleteUpdate={onDeleteUpdate}
              handlePublish={handlePublish}
              onUploadedFile={onUploadedFile}
            />
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
    </>
  );
}

NewUpdate.propTypes = {
  standupId: PropTypes.string
};

export default NewUpdate;
