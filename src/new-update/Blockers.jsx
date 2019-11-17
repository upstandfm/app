import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../components/Button';
import AudioRecorder from '../components/AudioRecorder';

import { Subtitle, Actions } from './Layout';

const ButtonSpaceRight = styled(Button)`
  margin: 0 1.5em 0 0;
`;

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
        <ButtonSpaceRight tertiary onClick={handlePreviousStep}>
          Previous
        </ButtonSpaceRight>

        {hasRecording ? (
          <Button tertiary onClick={handleNextStep}>
            Next
          </Button>
        ) : (
          <Button tertiary onClick={handleNextStep}>
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
