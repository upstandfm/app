import React from 'react';

import { ExitButton } from '../components/Button';

import { Container, Header, Main, Preview, PreviewText } from './Layout';
import { Questions, Question } from './Questions';

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

  return (
    <Container>
      <Header>
        <h1>New update</h1>

        <ExitButton aria-label="exit" title="exit" />
      </Header>

      <Main>
        <Questions>
          {QUESTIONS.map((question, i) => {
            const isDone = i < activeQuestionIndex;
            const isActive = i === activeQuestionIndex;
            const isLast = i === QUESTIONS.length - 1;

            return (
              <Question
                key={`${question.title.toLowerCase()}-${i}`}
                isDone={isDone}
                isActive={isActive}
                isLast={isLast}
                title={question.title}
                subtitle={question.subtitle}
              />
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
