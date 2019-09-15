import React from 'react';
import styled from 'styled-components';

import { Form, Section, Label, InlineLabel, Input, Description } from './Input';

export default {
  title: 'components|Form/Input',
  parameters: {
    componentSubtitle: 'Form building blocks'
  }
};

const Container = styled.form`
  width: 320px;
  border: 1px dashed lightgrey;
  padding: 1em;
`;

export const DefaultInput = () => {
  return (
    <Form>
      <Container>
        <Section>
          <Label htmlFor="name">
            NAME
            <Input type="text" id="name" placeholder="Placeholder" />
          </Label>

          <Description>Your preferred name.</Description>
        </Section>
      </Container>
    </Form>
  );
};

DefaultInput.story = {
  name: 'default'
};

export const DefaultValueInput = () => {
  return (
    <Form>
      <Container>
        <Section>
          <Label htmlFor="name-1">
            NAME
            <Input type="text" id="name-1" defaultValue="Daniel" />
          </Label>

          <Description>Your preferred name.</Description>
        </Section>
      </Container>
    </Form>
  );
};

DefaultValueInput.story = {
  name: 'default value'
};

export const DisabledInput = () => {
  return (
    <Form>
      <Container>
        <Section>
          <Label htmlFor="name">
            NAME
            <Input type="text" id="name" placeholder="Placeholder" disabled />
          </Label>

          <Description>Your preferred name.</Description>
        </Section>
      </Container>
    </Form>
  );
};

DisabledInput.story = {
  name: 'disabled'
};

export const DisabledValueInput = () => {
  return (
    <Form>
      <Container>
        <Section>
          <Label htmlFor="name">
            NAME
            <Input disabled type="text" id="name" value="Daniël" />
          </Label>

          <Description>Your preferred name.</Description>
        </Section>
      </Container>
    </Form>
  );
};

DisabledValueInput.story = {
  name: 'disabled value'
};

export const ErroredInput = () => {
  return (
    <Form>
      <Container>
        <Section>
          <Label htmlFor="email">
            NAME
            <Input type="email" id="email" value="abc" />
          </Label>

          <Description error>Invalid email.</Description>
        </Section>
      </Container>
    </Form>
  );
};

ErroredInput.story = {
  name: 'error'
};

export const InlineInput = () => {
  return (
    <Form>
      <Container>
        <Section>
          <InlineLabel htmlFor="name">
            NAME
            <Input type="text" id="name" placeholder="Placeholder" />
          </InlineLabel>
        </Section>
      </Container>
    </Form>
  );
};

InlineInput.story = {
  name: 'inline'
};
