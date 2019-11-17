import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../components/Button';
import AudioRecorder from '../components/AudioRecorder';

import { Subtitle, Actions } from './Layout';

const ButtonSpaceRight = styled(Button)`
  margin: 0 1.5em 0 0;
`;

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
        <ButtonSpaceRight tertiary onClick={handlePreviousStep}>
          Previous
        </ButtonSpaceRight>

        <Button tertiary disabled={!hasRecording} onClick={handleNextStep}>
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
