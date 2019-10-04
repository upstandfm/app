import React from 'react';
import PropTypes from 'prop-types';

import Button from '../components/Button';
import AudioRecorder from '../audio-recorder';

import { Subtitle, Actions } from './Layout';

function Today({
  update,
  dispatch,
  stream,
  handleNextStep,
  handlePreviousStep
}) {
  const hasRecording = Boolean(update.blob);

  return (
    <div>
      <Subtitle>What do you have planned for today?</Subtitle>

      <AudioRecorder
        id={update.id}
        stream={stream}
        dispatch={dispatch}
        hasRecording={hasRecording}
      />

      <Actions>
        <Button tertiary onClick={handlePreviousStep}>
          Previous
        </Button>

        <Button secondary disabled={!hasRecording} onClick={handleNextStep}>
          Next
        </Button>
      </Actions>
    </div>
  );
}

Today.propTypes = {
  update: PropTypes.shape({
    id: PropTypes.string.isRequired,
    blob: PropTypes.object
  }),
  dispatch: PropTypes.func.isRequired,
  stream: PropTypes.object.isRequired,
  handleNextStep: PropTypes.func.isRequired,
  handlePreviousStep: PropTypes.func.isRequired
};

export default Today;
