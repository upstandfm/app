import React from 'react';
import PropTypes from 'prop-types';

import Button from '../components/Button';
import AudioRecorder from '../components/AudioRecorder';

import { Subtitle, Actions } from './Layout';

function Yesterday({ update, dispatch, stream, handleNextStep }) {
  const hasRecording = Boolean(update.blob);

  return (
    <div>
      <Subtitle>Did you work on something yesterday?</Subtitle>

      <AudioRecorder
        id={update.id}
        stream={stream}
        dispatch={dispatch}
        hasRecording={hasRecording}
      />

      <Actions>
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

Yesterday.propTypes = {
  update: PropTypes.shape({
    id: PropTypes.string.isRequired,
    blob: PropTypes.object
  }),
  dispatch: PropTypes.func.isRequired,
  stream: PropTypes.object.isRequired,
  handleNextStep: PropTypes.func.isRequired
};

export default Yesterday;
