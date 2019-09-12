import React from 'react';
import styled from 'styled-components';

import { Section, Label, Input, Description } from './Input';

export default {
  title: 'components|Form/Input',
  parameters: {
    componentSubtitle: 'Form building blocks'
  }
};

const Form = styled.form`
  width: 320px;
  border: 1px dashed lightgrey;
  padding: 1em;
`;

export const DefaultInput = () => {
  return (
    <Form>
      <Section>
        <Label htmlFor="name">
          NAME
          <Input type="text" id="name" placeholder="Placeholder" />
        </Label>

        <Description>Your preferred name.</Description>
      </Section>
    </Form>
  );
};

DefaultInput.story = {
  name: 'default'
};

export const DefaultValueInput = () => {
  return (
    <Form>
      <Section>
        <Label htmlFor="name-1">
          NAME
          <Input type="text" id="name-1" defaultValue="Daniel" />
        </Label>

        <Description>Your preferred name.</Description>
      </Section>
    </Form>
  );
};

DefaultValueInput.story = {
  name: 'default value'
};

export const InlineInput = () => {
  return (
    <Form>
      <Section>
        <Label htmlFor="name" inline>
          NAME
          <Input type="text" id="name" placeholder="Placeholder" />
        </Label>
      </Section>
    </Form>
  );
};

InlineInput.story = {
  name: 'inline'
};

export const DisabledInput = () => {
  return (
    <Form>
      <Section>
        <Label htmlFor="name">
          NAME
          <Input type="text" id="name" placeholder="Placeholder" disabled />
        </Label>

        <Description>Your preferred name.</Description>
      </Section>
    </Form>
  );
};

DisabledInput.story = {
  name: 'disabled'
};

export const DisabledValueInput = () => {
  return (
    <Form>
      <Section>
        <Label htmlFor="name">
          NAME
          <Input type="text" id="name" value="Daniël" disabled />
        </Label>

        <Description>Your preferred name.</Description>
      </Section>
    </Form>
  );
};

DisabledValueInput.story = {
  name: 'disabled value'
};
