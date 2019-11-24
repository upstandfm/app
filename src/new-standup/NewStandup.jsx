import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

import { ExitButton } from '../components/Button';
import { Confirm } from '../components/Modal';
import { Steps, Step } from '../components/StepForm';

import standupReducer, { defaultStandupState } from './reducer';

import { Container, Wrapper, Header, Title } from './Layout';
import Standup from './Standup';
import Invite from './Invite';
import Final from './Final';

export const questionsByStepIndex = [
  {
    id: 'name',
    title: 'Name',
    Component: Standup
  },

  {
    id: 'invite',
    title: 'Invite',
    Component: Invite
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
      standupUsers={standup.users}
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
    name: PropTypes.string,
    users: PropTypes.arrayOf(PropTypes.string)
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

  return (
    <>
      <Container>
        <Wrapper>
          <Header>
            <Title>New standup</Title>

            <ExitButton aria-label="exit" title="exit" onClick={handleExit} />
          </Header>

          <Steps total={totalSteps} aria-label="steps to create new standup">
            {questionsByStepIndex.map((el, i) => {
              const { id, title } = el;
              const isDone = i < stepIndex;
              const isCurrent = i === stepIndex;

              return (
                <Step
                  key={id}
                  done={isDone}
                  current={isCurrent}
                  aria-current={isCurrent ? `step ${id}` : ''}
                >
                  {title}
                </Step>
              );
            })}
          </Steps>

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
    </>
  );
}

export default NewStandup;
