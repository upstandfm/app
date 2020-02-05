import React from 'react';
import styled, { keyframes } from 'styled-components';

import Content, { Title, Subtitle, Section } from '../components/Content';

import {
  Form,
  Section as FormSection,
  LoadingLabel,
  LoadingInput,
  Description
} from '../components/Form';

import { FormWrapper, Info } from './Layout';

const glimmer = keyframes`
  0% {
    background-position: -235px 0;
  }
  100% {
    background-position: calc(235px + 100%) 0;
  }
`;

const LoadingInfo = styled(Info)`
  color: transparent;
  background-color: var(--color-light-grey);
  border-radius: var(--radius-size);
  background-repeat: no-repeat;
  background-image: linear-gradient(
    90deg,
    var(--color-light-grey),
    var(--color-lighter-grey),
    var(--color-light-grey)
  );
  background-size: 100% 100%;
  animation: ${glimmer} 1s ease-in-out infinite;

  :hover {
    cursor: wait;
  }
`;

function Loading() {
  return (
    <Content>
      <Title>Workspace details</Title>
      <Subtitle>Your workspace information and settings.</Subtitle>

      <Section>
        <LoadingInfo>This is some loading text</LoadingInfo>

        <FormWrapper>
          <Form>
            <FormSection>
              <LoadingLabel>
                NAME
                <LoadingInput disabled />
              </LoadingLabel>

              <Description />
            </FormSection>

            <FormSection>
              <LoadingLabel>
                SLUG
                <LoadingInput disabled />
              </LoadingLabel>

              <Description />
            </FormSection>
          </Form>
        </FormWrapper>
      </Section>
    </Content>
  );
}

export default Loading;
