import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/Button';
import { CardPreview } from '../components/Cards';
import { Confirm } from '../components/Modal';

import standupReducer from './reducer';

import { Container, Header, Main, Preview, PreviewText } from './Layout';
import { Steps, Step } from './Steps';
import Standup from './Standup';
import Invite from './Invite';
import Final from './Final';

export const ComponentsByStepIndex = [
  ['Name', Standup],
  ['Invite', Invite],
  ['Create', Final]
];

function PureNewStandup({
  componentsByStepIndex,
  standup,
  dispatch,
  stepIndex,
  handleNextStep,
  handlePreviousStep
}) {
  const [, Component] = componentsByStepIndex[stepIndex] || [];

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
  componentsByStepIndex: PropTypes.arrayOf(PropTypes.array),
  standup: PropTypes.shape({
    name: PropTypes.string,
    users: PropTypes.arrayOf(PropTypes.string)
  }),
  dispatch: PropTypes.func.isRequired,
  stepIndex: PropTypes.number.isRequired,
  handleNextStep: PropTypes.func.isRequired,
  handlePreviousStep: PropTypes.func.isRequired
};

const Exit = styled(Button)`
  background-color: transparent;
  box-shadow: none;
  border-color: transparent;
  color: var(--color-grey) !important;

  :hover {
    background-color: var(--color-lighter-grey);
    border-color: transparent;
  }

  :active {
    background-color: var(--color-light-grey);
    border-color: transparent;
  }
`;

function NewStandup() {
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [standup, dispatch] = React.useReducer(standupReducer, {
    name: '',
    users: []
  });

  const totalSteps = ComponentsByStepIndex.length;

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
        <Header>
          <h1>New standup</h1>

          <Exit round aria-label="exit" title="exit" onClick={handleExit}>
            <FontAwesomeIcon icon="times" size="lg" />
          </Exit>
        </Header>

        <Steps total={totalSteps} aria-label="steps to create new standup">
          {ComponentsByStepIndex.map((el, i) => {
            const [title] = el;
            const isDone = i < stepIndex;
            const isCurrent = i === stepIndex;

            return (
              <Step
                key={title}
                done={isDone}
                current={isCurrent}
                aria-current={isCurrent ? `step ${title.toLowerCase()}` : ''}
              >
                {title} {isDone && <FontAwesomeIcon icon="check" size="sm" />}
              </Step>
            );
          })}
        </Steps>

        <Main>
          <PureNewStandup
            componentsByStepIndex={ComponentsByStepIndex}
            standup={standup}
            dispatch={dispatch}
            stepIndex={stepIndex}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />

          <Preview>
            <PreviewText>PREVIEW</PreviewText>
            <CardPreview title={standup.name} />
          </Preview>
        </Main>
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
