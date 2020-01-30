import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../Button';
import { useSnackbar } from '../Snackbar';

import useRecordAudio from './use-record-audio';

import { Container, Main, Subtitle, Info } from './Layout';
import PreparingTimer from './PreparingTimer';
import ProgressTimer from './ProgressTimer';

const StartRecordButton = styled(Button)`
  color: var(--color-white);
  background-color: var(--color-dark-red);
  border-color: var(--color-dark-red);

  :hover {
    background-color: var(--color-red);
    border-color: var(--color-red);
  }
`;

const StopRecordButton = styled(Button)`
  color: var(--color-dark-red);
  background-color: transparent;
  border-color: var(--color-dark-red);

  :hover {
    background-color: transparent;
    border-color: var(--color-red);
    color: var(--color-red);
  }
`;

function AudioRecorder({ stream, onNewRecording, isDisabled }) {
  const [
    startRecording,
    stopRecording,
    recorderErr,
    isRecording
  ] = useRecordAudio(stream, onNewRecording);

  const [, snackbarDispatch] = useSnackbar();

  React.useEffect(() => {
    if (!recorderErr) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to record update',
        text: recorderErr.message
      }
    });
  }, [recorderErr]); // eslint-disable-line react-hooks/exhaustive-deps

  const [isPreparing, setIsPreparing] = React.useState(false);

  const handleStartCountDown = () => {
    setIsPreparing(true);
  };

  const handleEndCountDown = () => {
    setIsPreparing(false);
    startRecording();
  };

  return (
    <Container>
      {isPreparing && (
        <PreparingTimer
          maxCountSec={3}
          intervalMs={1e3}
          onDone={handleEndCountDown}
        />
      )}
      <Main>
        <Subtitle>
          {isRecording ? (
            <ProgressTimer
              maxCountSec={180}
              intervalMs={1e3}
              onDone={stopRecording}
            />
          ) : (
            <>
              Hit <b>rec</b> to start recording your update.
            </>
          )}
        </Subtitle>

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
            disabled={isDisabled || isPreparing}
            onClick={handleStartCountDown}
          >
            rec
          </StartRecordButton>
        )}

        <Info>
          <FontAwesomeIcon icon="info-circle" size="sm" /> You can preview
          recordings before publishing.
        </Info>
      </Main>
    </Container>
  );
}

AudioRecorder.propTypes = {
  stream: PropTypes.object.isRequired,
  onNewRecording: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired
};

export default AudioRecorder;
