import React from 'react';

import { Skeleton } from '../components/Loading';
import Content, { Title, Subtitle, Section } from '../components/Content';

import {
  Form,
  Section as FormSection,
  LoadingLabel,
  LoadingInput,
  Description
} from '../components/Form';

import { FormWrapper, Info } from './Layout';

function Loading() {
  return (
    <Content>
      <Title>Workspace details</Title>
      <Subtitle>Your workspace information and settings.</Subtitle>

      <Section>
        <Skeleton as={Info}>Loading information text</Skeleton>

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
