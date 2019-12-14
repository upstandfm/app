import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../Button';

import useRecordAudio from './use-record-audio';

import { RecorderError } from './Errors';
import { Container, Main, Subtitle, Info } from './Layout';
import PreparingTimer from './PreparingTimer';
import ProgressTimer from './ProgressTimer';

const StartRecordButton = styled(Button)`
  color: var(--color-white);
  background-color: var(--color-dark-red);

  :hover {
    background-color: var(--color-red);
    border-color: var(--color-red);
  }
`;

const StopRecordButton = styled(Button)`
  background-color: transparent;
  border-color: var(--color-dark-red);
  color: var(--color-dark-red);

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

  const [isPreparing, setIsPreparing] = React.useState(false);

  const handleStartCountDown = () => {
    setIsPreparing(true);
  };

  const handleEndCountDown = () => {
    setIsPreparing(false);
    startRecording();
  };

  if (recorderErr) {
    return <RecorderError err={recorderErr} />;
  }

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
          <FontAwesomeIcon icon="lightbulb" size="sm" /> You can preview
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
