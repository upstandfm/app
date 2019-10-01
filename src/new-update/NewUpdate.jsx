import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AudioRecorder from '../audio-recorder';
import Button, { ExitButton } from '../components/Button';

import { Container, Header, Main, Preview, PreviewText } from './Layout';
import { Questions, Question, Actions } from './Questions';

const QUESTIONS = [
  {
    title: 'Yesterday',
    subtitle: 'What did you work on yesterday?'
  },
  {
    title: 'Today',
    subtitle: 'What do you have planned for today?'
  },
  {
    title: 'Blockers',
    subtitle: 'Anything blocking you from doing your work?'
  }
];

function NewStandup() {
  const [activeQuestionIndex, setActiveQuestionIndex] = React.useState(0);
  const [showRecorder, setShowRecorder] = React.useState(false);

  const handleSkip = () => {
    setShowRecorder(false);
    setActiveQuestionIndex(activeQuestionIndex + 1);
  };

  const handlePrevious = () => {
    setShowRecorder(false);
    setActiveQuestionIndex(activeQuestionIndex - 1);
  };

  const handleNext = () => {
    setShowRecorder(false);
    setActiveQuestionIndex(activeQuestionIndex + 1);
  };

  const handleRecord = () => {
    setShowRecorder(true);
  };

  return (
    <Container>
      <Header>
        <h1>New update</h1>

        <ExitButton aria-label="exit" title="exit" />
      </Header>

      <Main>
        <Questions aria-label="steps to create new update">
          {QUESTIONS.map((question, i) => {
            const isDone = i < activeQuestionIndex;
            const isActive = i === activeQuestionIndex;
            const isFirst = i === 0;
            const isLast = i === QUESTIONS.length - 1;

            return (
              <Question
                key={`${question.title.toLowerCase()}-${i}`}
                isDone={isDone}
                isActive={isActive}
                isLast={isLast}
                title={question.title}
                subtitle={question.subtitle}
                aria-current={
                  isActive ? `step ${question.title.toLowerCase()}` : ''
                }
              >
                <Actions>
                  {isFirst ? (
                    <Button tertiary onClick={handleSkip}>
                      Skip
                    </Button>
                  ) : (
                    <Button tertiary onClick={handlePrevious}>
                      Previous
                    </Button>
                  )}
                  <Button
                    primary
                    onClick={handleRecord}
                    disabled={showRecorder}
                  >
                    <FontAwesomeIcon icon="microphone" /> Record update
                  </Button>
                </Actions>

                {showRecorder && <AudioRecorder onDone={handleNext} />}
              </Question>
            );
          })}
        </Questions>

        <Preview>
          <PreviewText>PREVIEW</PreviewText>
        </Preview>
      </Main>
    </Container>
  );
}

export default NewStandup;
