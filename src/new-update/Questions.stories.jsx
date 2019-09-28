import React from 'react';

import { Questions, Question } from './Questions';

export default {
  title: 'screens|New Update/Questions',
  component: Question,
  parameters: {
    componentSubtitle: 'Verticle step components'
  }
};

export const FirstActiveQuestions = () => {
  return (
    <Questions>
      <Question
        isActive={true}
        title="Yesterday"
        subtitle="What did you work on yesterday?"
      >
        Children
      </Question>

      <Question title="Today" subtitle="What do you have planned for today?">
        Children
      </Question>

      <Question
        isLast={true}
        title="Blockers"
        subtitle="Anything blocking you from doing your work?"
      >
        Children
      </Question>
    </Questions>
  );
};

FirstActiveQuestions.story = {
  name: 'first active'
};

export const SecondActiveQuestions = () => {
  return (
    <Questions>
      <Question
        isDone={true}
        title="Yesterday"
        subtitle="What did you work on yesterday?"
      >
        Children
      </Question>

      <Question
        isActive={true}
        title="Today"
        subtitle="What do you have planned for today?"
      >
        Children
      </Question>

      <Question
        isLast={true}
        title="Blockers"
        subtitle="Anything blocking you from doing your work?"
      >
        Children
      </Question>
    </Questions>
  );
};

SecondActiveQuestions.story = {
  name: 'second active'
};

export const ThirdActiveQuestions = () => {
  return (
    <Questions>
      <Question
        isDone={true}
        title="Yesterday"
        subtitle="What did you work on yesterday?"
      >
        Children
      </Question>

      <Question
        isDone={true}
        title="Today"
        subtitle="What do you have planned for today?"
      >
        Children
      </Question>

      <Question
        isActive={true}
        isLast={true}
        title="Blockers"
        subtitle="Anything blocking you from doing your work?"
      >
        Children
      </Question>
    </Questions>
  );
};

ThirdActiveQuestions.story = {
  name: 'third active'
};
