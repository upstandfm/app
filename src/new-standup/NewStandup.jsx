import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '../components/Button';
import { CardPreview } from '../components/Cards';

import standupReducer from './reducer';

import { Container, Header, Title, Main, Preview, PreviewText } from './Layout';
import { Steps, Step } from './Steps';
import Standup from './Standup';
import Invite from './Invite';
import Final from './Final';

export const ComponentsByStepIndex = [
  ['Name', Standup],
  ['Invite', Invite],
  ['Create', Final]
];

export function PureNewStandup({
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
  background-color: var(--color-light-grey);
  box-shadow: none;
  border-color: transparent;

  :hover {
    background-color: var(--color-grey);
    border-color: transparent;
  }

  :active {
    background-color: var(--color-dark-grey);
    border-color: transparent;
  }
`;

function NewStandup() {
  const [stepIndex, setStepIndex] = React.useState(0);
  const [standup, dispatch] = React.useReducer(standupReducer, {
    name: '',
    users: []
  });

  const totalSteps = ComponentsByStepIndex.length;

  const handleExit = () => {
    console.log('click exit');
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
    <Container>
      <Header>
        <Title>New standup</Title>

        <Exit
          round
          aria-label="exit new standup"
          title="exit new standup"
          onClick={handleExit}
        >
          <FontAwesomeIcon icon="times" size="2x" />
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
  );
}

export default NewStandup;
