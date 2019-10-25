import React from 'react';
import PropTypes from 'prop-types';

import Button from '../components/Button';
import AudioRecorder from '../components/AudioRecorder';

import { Subtitle, Actions } from './Layout';

function Blockers({
  update,
  dispatch,
  stream,
  handleNextStep,
  handlePreviousStep
}) {
  const hasRecording = Boolean(update.blob);

  return (
    <div>
      <Subtitle>Anything blocking you from doing your work?</Subtitle>

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

        {hasRecording ? (
          <Button secondary onClick={handleNextStep}>
            Next
          </Button>
        ) : (
          <Button secondary onClick={handleNextStep}>
            Skip
          </Button>
        )}
      </Actions>
    </div>
  );
}

Blockers.propTypes = {
  update: PropTypes.shape({
    id: PropTypes.string.isRequired,
    blob: PropTypes.object
  }),
  dispatch: PropTypes.func.isRequired,
  stream: PropTypes.object.isRequired,
  handleNextStep: PropTypes.func.isRequired,
  handlePreviousStep: PropTypes.func.isRequired
};

export default Blockers;
