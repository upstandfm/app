import React from 'react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import { PureNewChannel } from './NewChannel';

const onExit = action('onExit');
const setName = action('setName');
const handleCreate = action('handleCreate');

const Container = styled.div`
  border: 1px dashed var(--color-light-grey);
  background-color: var(--color-white);
`;

export default {
  title: 'modules/NewChannel',
  component: PureNewChannel,
  parameters: {
    componentSubtitle: 'New channel screen'
  }
};

export const DefaultNewChannel = () => {
  return (
    <Container>
      <PureNewChannel
        onExit={onExit}
        name=""
        setName={setName}
        handleCreate={handleCreate}
        isCreating={false}
      />
    </Container>
  );
};

DefaultNewChannel.story = {
  name: 'default'
};

export const NamedNewChannel = () => {
  return (
    <Container>
      <PureNewChannel
        onExit={onExit}
        name="Upstand FM"
        setName={setName}
        handleCreate={handleCreate}
        isCreating={false}
      />
    </Container>
  );
};

NamedNewChannel.story = {
  name: 'named'
};

export const CreatingNewChannel = () => {
  return (
    <Container>
      <PureNewChannel
        onExit={onExit}
        name="Upstand FM"
        setName={setName}
        handleCreate={handleCreate}
        isCreating={true}
      />
    </Container>
  );
};

CreatingNewChannel.story = {
  name: 'creating'
};
