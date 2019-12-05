import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

import { ExitButton } from '../components/Button';
import { Confirm } from '../components/Modal';

import standupReducer, { defaultStandupState } from './reducer';

import { Container, Wrapper, ExitContainer, Header, Title } from './Layout';
import Standup from './Standup';
import Final from './Final';

export const questionsByStepIndex = [
  {
    id: 'name',
    title: 'Name',
    Component: Standup
  },

  {
    id: 'create',
    title: 'Create',
    Component: Final
  }
];

function PureNewStandup({
  questionsByStepIndex,
  stepIndex,
  standup,
  dispatch,
  handleNextStep,
  handlePreviousStep
}) {
  const { Component } = questionsByStepIndex[stepIndex] || {};

  if (!Component) {
    return null;
  }

  return (
    <Component
      standupName={standup.name}
      dispatch={dispatch}
      handlePreviousStep={handlePreviousStep}
      handleNextStep={handleNextStep}
    />
  );
}

PureNewStandup.propTypes = {
  questionsByStepIndex: PropTypes.arrayOf(PropTypes.object),
  stepIndex: PropTypes.number.isRequired,
  standup: PropTypes.shape({
    name: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired,
  handleNextStep: PropTypes.func.isRequired,
  handlePreviousStep: PropTypes.func.isRequired
};

function NewStandup() {
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [standup, dispatch] = React.useReducer(
    standupReducer,
    defaultStandupState
  );

  const totalSteps = questionsByStepIndex.length;

  const navigateHome = () => {
    navigate('/');
  };

  const handleExit = () => {
    const hasProgress = Boolean(standup.name);
    if (hasProgress) {
      setShowConfirm(true);
      return;
    }

    navigateHome();
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleNextStep = () => {
    if (stepIndex >= totalSteps - 1) {
      return;
    }

    setStepIndex(i => i + 1);
  };

  const handlePreviousStep = () => {
    if (stepIndex <= 0) {
      return;
    }

    setStepIndex(i => i - 1);
  };

  return ReactDOM.createPortal(
    <>
      <Container>
        <ExitContainer>
          <ExitButton aria-label="exit" title="exit" onClick={handleExit} />
        </ExitContainer>

        <Wrapper>
          <Header>
            <Title>New standup</Title>
          </Header>

          <PureNewStandup
            questionsByStepIndex={questionsByStepIndex}
            stepIndex={stepIndex}
            standup={standup}
            dispatch={dispatch}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        </Wrapper>
      </Container>

      <Confirm
        show={showConfirm}
        handleCancel={handleCancel}
        handleConfirm={navigateHome}
        title="Are you sure you want to exit?"
        message={
          <>
            Your progress will be <b>lost</b> if you exit now.
          </>
        }
      />
    </>,
    document.body
  );
}

export default NewStandup;
