import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

import { ExitButton } from '../components/Button';
import { Steps, Step } from '../components/StepForm';
import { Confirm } from '../components/Modal';

import { Container, Header, Title, Main, Preview, PreviewText } from './Layout';
import Permission from './Permission';
import Yesterday from './Yesterday';
import Today from './Today';
import Blockers from './Blockers';
import Save from './Save';
import Recordings from './Recordings';
import UploadRecordings from './UploadRecordings';

import updatesReducer, { defaultUpdatesState } from './reducer';
import useGetUserMedia from './use-get-user-media';

export const questionsByStepIndex = [
  {
    id: 'yesterday',
    title: 'Yesterday',
    Component: Yesterday
  },

  {
    id: 'today',
    title: 'Today',
    Component: Today
  },

  {
    id: 'blockers',
    title: 'Blockers',
    Component: Blockers
  },

  {
    id: 'save',
    title: 'Save & publish',
    Component: Save
  }
];

function PureNewUpdate({
  questionsByStepIndex,
  stepIndex,
  updatesByQuestionId,
  dispatch,
  stream,
  handleNextStep,
  handlePreviousStep,
  handleSave,
  isSaving
}) {
  const { id, Component } = questionsByStepIndex[stepIndex] || {};
  const update = updatesByQuestionId[id];

  if (!Component) {
    return null;
  }

  return (
    <Component
      update={update}
      dispatch={dispatch}
      stream={stream}
      handleNextStep={handleNextStep}
      handlePreviousStep={handlePreviousStep}
      handleSave={handleSave}
      isSaving={isSaving}
    />
  );
}

PureNewUpdate.propTypes = {
  questionsByStepIndex: PropTypes.arrayOf(PropTypes.object),
  stepIndex: PropTypes.number.isRequired,
  updatesByQuestionId: PropTypes.shape({
    yesterday: PropTypes.shape({
      id: PropTypes.string.isRequired,
      blob: PropTypes.object,
      isUploaded: PropTypes.bool.isRequired
    }),
    today: PropTypes.shape({
      id: PropTypes.string.isRequired,
      blob: PropTypes.object,
      isUploaded: PropTypes.bool.isRequired
    }),
    blockers: PropTypes.shape({
      id: PropTypes.string.isRequired,
      blob: PropTypes.object,
      isUploaded: PropTypes.bool.isRequired
    })
  }),
  dispatch: PropTypes.func.isRequired,
  stream: PropTypes.object.isRequired,
  handleNextStep: PropTypes.func.isRequired,
  handlePreviousStep: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired
};

function NewUpdate({ standupId }) {
  const totalSteps = questionsByStepIndex.length;

  const [updatesState, updatesDispatch] = React.useReducer(
    updatesReducer,
    defaultUpdatesState
  );

  const [
    getUserMedia,
    isGettingPermission,
    permissionErr,
    userMediaStream
  ] = useGetUserMedia();

  const [showConfirm, setShowConfirm] = React.useState(false);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [isSaving, setIsSaving] = React.useState(false);

  const navigateToStandup = () => {
    navigate(`/standups/${standupId}`);
  };

  const updateIdsWithRecording = Object.keys(updatesState).filter(id =>
    Boolean(updatesState[id].blob)
  );
  const isDoneUploading = updateIdsWithRecording.every(
    id => updatesState[id].isUploaded
  );

  React.useEffect(
    function redirectWhenDoneUploading() {
      if (!isSaving) {
        return;
      }

      if (isDoneUploading) {
        // Give some time for the progress animation(s) to finish
        setTimeout(navigateToStandup, 500);
      }
    },
    [isSaving, isDoneUploading] // eslint-disable-line react-hooks/exhaustive-deps
  );

  // Event handlers

  const handleExit = () => {
    const hasProgress = Object.values(updatesState).some(update =>
      Boolean(update.blob)
    );
    if (hasProgress) {
      setShowConfirm(true);
      return;
    }

    navigateToStandup();
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleGetPermission = () => {
    getUserMedia({ audio: true });
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

  const handleSave = () => {
    setIsSaving(true);
  };

  return (
    <>
      <Container>
        <Header>
          <Title>New update</Title>

          <ExitButton aria-label="exit" title="exit" onClick={handleExit} />
        </Header>

        {!userMediaStream ? (
          <Permission
            isLoading={isGettingPermission}
            err={permissionErr}
            handleGetPermission={handleGetPermission}
          />
        ) : (
          <>
            <Steps total={totalSteps} aria-label="steps to create new update">
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
                    {title}{' '}
                  </Step>
                );
              })}
            </Steps>

            <Main>
              <PureNewUpdate
                questionsByStepIndex={questionsByStepIndex}
                stepIndex={stepIndex}
                updatesByQuestionId={updatesState}
                dispatch={updatesDispatch}
                stream={userMediaStream}
                handleNextStep={handleNextStep}
                handlePreviousStep={handlePreviousStep}
                handleSave={handleSave}
                isSaving={isSaving}
              />

              <Preview>
                <PreviewText>PREVIEW</PreviewText>

                {isSaving ? (
                  <UploadRecordings
                    standupId={standupId}
                    updatesByQuestionId={updatesState}
                    dispatch={updatesDispatch}
                  />
                ) : (
                  <Recordings
                    updatesByQuestionId={updatesState}
                    dispatch={updatesDispatch}
                    currentQuestionId={questionsByStepIndex[stepIndex].id}
                  />
                )}
              </Preview>
            </Main>
          </>
        )}
      </Container>

      <Confirm
        show={showConfirm}
        handleCancel={handleCancel}
        handleConfirm={navigateToStandup}
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

NewUpdate.propTypes = {
  standupId: PropTypes.string
};

export default NewUpdate;
