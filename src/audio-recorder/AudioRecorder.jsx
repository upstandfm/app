import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/Button';

import useRecordAudio from './use-record-audio';

import { RecorderError } from './Errors';
import { Container, Main, Subtitle, Info } from './Layout';
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

function AudioRecorder({ id, stream, dispatch, hasRecording }) {
  const [
    startRecording,
    stopRecording,
    recorderErr,
    isRecording
  ] = useRecordAudio(id, stream, dispatch);

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
          ) : hasRecording ? (
            'Recording added to preview!'
          ) : (
            <>
              Hit <b>rec</b> to start your update.
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
            disabled={isPreparing || hasRecording}
            onClick={handleStartCountDown}
          >
            rec
          </StartRecordButton>
        )}

        <Info>
          <FontAwesomeIcon icon="lightbulb" size="sm" />{' '}
          {hasRecording
            ? 'Delete the preview to record again.'
            : 'You can preview updates before saving.'}
        </Info>
      </Main>
    </Container>
  );
}

AudioRecorder.propTypes = {
  id: PropTypes.oneOf(['yesterday', 'today', 'blockers']).isRequired,
  stream: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  hasRecording: PropTypes.bool.isRequired
};

export default AudioRecorder;
