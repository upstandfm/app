import React from 'react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import { PureNewStandup } from './NewStandup';

const onExit = action('onExit');
const setStandupName = action('setStandupName');
const handleCreate = action('handleCreate');

const Container = styled.div`
  border: 1px dashed var(--color-light-grey);
  background-color: var(--color-white);
`;

export default {
  title: 'screens|NewStandup',
  component: PureNewStandup,
  parameters: {
    componentSubtitle: 'New standup screen'
  }
};

export const DefaultNewStandup = () => {
  return (
    <Container>
      <PureNewStandup
        onExit={onExit}
        standupName=""
        setStandupName={setStandupName}
        handleCreate={handleCreate}
        isCreating={false}
      />
    </Container>
  );
};

DefaultNewStandup.story = {
  name: 'default'
};

export const NamedNewStandup = () => {
  return (
    <Container>
      <PureNewStandup
        onExit={onExit}
        standupName="Upstand FM"
        setStandupName={setStandupName}
        handleCreate={handleCreate}
        isCreating={false}
      />
    </Container>
  );
};

NamedNewStandup.story = {
  name: 'named'
};

export const CreatingNewStandup = () => {
  return (
    <Container>
      <PureNewStandup
        onExit={onExit}
        standupName="Upstand FM"
        setStandupName={setStandupName}
        handleCreate={handleCreate}
        isCreating={true}
      />
    </Container>
  );
};

CreatingNewStandup.story = {
  name: 'creating'
};
