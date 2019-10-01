import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/Button';

import useGetUserMedia from './use-get-user-media';
import useRecordAudio from './use-record-audio';
import Loading from './Loading';
import { MediaError, RecorderError } from './Errors';
import { Container, Main, Title, Info, Actions } from './Layout';
import PreparingTimer from './PreparingTimer';
import ProgressTimer from './ProgressTimer';

const StartRecordButton = styled(Button)`
  width: 56px;
  height: 56px;
  background-color: var(--color-dark-red);
  border-color: var(--color-dark-red);
  box-shadow: none;

  :hover {
    background-color: var(--color-red);
    border-color: var(--color-red);
  }

  :active {
    background-color: var(--color-darker-red);
    border-color: var(--color-darker-red);
  }
`;

const StopRecordButton = styled(Button)`
  width: 56px;
  height: 56px;
  background-color: var(--color-light-grey);
  border-color: var(--color-light-grey);
  color: var(--color-dark-red) !important;
  box-shadow: none;

  :hover {
    background-color: var(--color-light-grey);
    border-color: var(--color-light-grey);
    color: var(--color-red) !important;
  }

  :active {
    background-color: var(--color-light-grey);
    border-color: var(--color-light-grey);
    color: var(--color-darker-red) !important;
  }
`;

function AudioRecorder({ onDone }) {
  const [getMediaStream, isLoading, mediaErr, mediaStream] = useGetUserMedia();

  const [
    startRecording,
    stopRecording,
    resetPreview,
    recorderErr,
    isRecording,
    previewUrl
  ] = useRecordAudio(mediaStream);

  const [isPreparing, setIsPreparing] = React.useState(false);

  React.useEffect(() => {
    getMediaStream({ audio: true });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleStartCountDown = () => {
    setIsPreparing(true);
  };

  const handleEndCountDown = () => {
    setIsPreparing(false);
    startRecording();
  };

  const handleDiscard = () => {
    // TODO: confirm

    resetPreview();
  };

  const handleSave = () => {
    const [track] = mediaStream.getAudioTracks();
    track.stop();

    // TODO: save + upload

    onDone();
  };

  if (isLoading) {
    return <Loading />;
  }

  if (mediaErr) {
    return <MediaError err={mediaErr} />;
  }

  if (recorderErr) {
    return <RecorderError err={recorderErr} />;
  }

  const hasPreview = Boolean(previewUrl);

  return (
    <Container>
      {isPreparing && (
        <PreparingTimer
          maxCountSec={3}
          intervalMs={1e3}
          onDone={handleEndCountDown}
        />
      )}

      {hasPreview ? (
        <Main>
          <Title>Sounds good?</Title>

          <audio controls src={previewUrl}></audio>

          <Actions>
            <Button secondary onClick={handleDiscard}>
              No, try again
            </Button>

            <Button onClick={handleSave}>Yes, save it</Button>
          </Actions>
        </Main>
      ) : (
        <Main>
          <Title>
            {isRecording ? (
              <ProgressTimer
                maxCountSec={180}
                intervalMs={1e3}
                onDone={stopRecording}
              />
            ) : (
              <>
                Hit <b>rec</b> to start recording
              </>
            )}
          </Title>

          {isRecording ? (
            <StopRecordButton
              round
              title="stop recording"
              aria-label="stop recording"
              onClick={stopRecording}
            >
              <FontAwesomeIcon icon="stop" size="2x" />
            </StopRecordButton>
          ) : (
            <StartRecordButton
              round
              title="start recording"
              aria-label="start recording"
              disabled={isPreparing}
              onClick={handleStartCountDown}
            >
              rec
            </StartRecordButton>
          )}

          <Info>
            <FontAwesomeIcon icon="lightbulb" size="sm" /> You can preview
            before saving.
          </Info>
        </Main>
      )}
    </Container>
  );
}

export default AudioRecorder;
