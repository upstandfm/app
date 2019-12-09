import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

import Button, { ExitButton } from '../components/Button';
import { Confirm } from '../components/Modal';
import AudioRecorder from '../components/AudioRecorder';

import {
  Container,
  Header,
  Main,
  Actions,
  Preview,
  PreviewText
} from './Layout';

import Permission from './Permission';
import Recordings from './Recordings';
import UploadRecordings from './UploadRecordings';

import updatesReducer, { defaultUpdatesState } from './reducer';
import useGetUserMedia from './use-get-user-media';

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
          <h1>New update</h1>

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
                id={''}
                stream={userMediaStream}
                dispatch={updatesDispatch}
              />

              <Preview>
                <PreviewText>PREVIEW</PreviewText>

                {isSaving ? (
                  <UploadRecordings
                    standupId={standupId}
                    updatesByQuestionId={updatesState}
                    dispatch={updatesDispatch}
                  />
                ) : (
                  <Recordings
                    updatesByQuestionId={updatesState}
                    dispatch={updatesDispatch}
                    currentQuestionId={''}
                  />
                )}
              </Preview>
            </Main>

            <Actions>
              <Button disabled>Publish</Button>
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
