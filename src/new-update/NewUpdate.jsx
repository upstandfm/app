import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import shortid from 'shortid';

import Button from '../components/Button';
import AudioRecorder from '../components/AudioRecorder';
import { useSnackbar } from '../components/Snackbar';
import { useAudioPlayer } from '../components/AudioPlayer';

import { Container, Wrapper, Preview, Actions } from './Layout';
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
      <Container>
        <Wrapper>
          <Permission
            isLoading={isGettingPermission}
            err={permissionErr}
            handleGetPermission={handleGetPermission}
          />
        </Wrapper>
      </Container>
    );
  }

  const recordingIds = Object.keys(recordingsState);
  const hasNoRecordings = recordingIds.length === 0;
  const hasInvalidRecording = recordingIds.some(
    id => recordingsState[id].isValid === false
  );

  return (
    <Container>
      <Wrapper>
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
            disabled={hasNoRecordings || hasInvalidRecording || isPublishing}
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
      </Wrapper>
    </Container>
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

const Subtitle = styled.p`
  color: var(--color-grey);
  letter-spacing: 1px;
  margin: 2em 0 0 0;
  text-transform: uppercase;
`;

function NewUpdate() {
  const { standupId } = useParams();
  const history = useHistory();
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

  const [isPublishing, setIsPublishing] = React.useState(false);

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
      setTimeout(() => {
        history.push(`/standups/${standupId}`);
      }, 750);
    },
    [hasUploadedAllFiles] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Because we need the latest recording IDs in the unmount phase, we store
  // them on every render
  const latestRecordingIds = React.useRef(recordingIds);
  React.useEffect(() => {
    latestRecordingIds.current = recordingIds;
  });

  React.useEffect(() => {
    // Provide a "blank" audio player on mount
    const { id } = audioPlayerState.playingFile;
    const hasPlayingFile = Boolean(id);
    if (hasPlayingFile) {
      audioPlayerDispatch({
        type: 'RESET_PLAYING_FILE',
        data: {}
      });
    }

    return () => {
      // "Clean up" file resources on unmount
      audioPlayerDispatch({
        type: 'UNLOAD_AUDIO_FILES',
        data: {
          // Access the "ref" to get the latest values, because we don't pass
          // any dependencies to "sync" the state with (this prevents stale
          // values from the "initial" render when the component mounts)
          ids: latestRecordingIds.current
        }
      });
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

  const onUpdateRecordingName = (id, name, isValid) => {
    recordingsDispatch({
      type: 'UPDATE_RECORDING_NAME',
      data: {
        id,
        name,
        isValid
      }
    });
  };

  const onDeleteUpdate = id => {
    audioPlayerDispatch({
      type: 'UNLOAD_AUDIO_FILES',
      data: {
        ids: [id]
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
  );
}

export default NewUpdate;
