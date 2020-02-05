import React from 'react';
import PropTypes from 'prop-types';

import { useWorkspace } from '../workspace';

import Content, { Title, Subtitle, Section } from '../components/Content';

import {
  Form,
  Section as FormSection,
  Label,
  Input,
  Description
} from '../components/Form';

import { FormWrapper, Info } from './Layout';
import Loading from './Loading';
import FetchError from './FetchError';

import { formatDate } from '../utils';

export function PureWorkspaceSettings({
  isFetching,
  fetchErr,
  createdAt,
  name,
  slug
}) {
  if (isFetching) {
    return <Loading />;
  }

  if (fetchErr) {
    return <FetchError err={fetchErr} />;
  }

  const createdEpoch = new Date(createdAt).getTime();

  return (
    <Content>
      <Title>Workspace details</Title>
      <Subtitle>Your workspace information and settings.</Subtitle>

      <Section>
        <Info>Created on {formatDate(createdEpoch)}</Info>

        <FormWrapper>
          <Form>
            <FormSection>
              <Label htmlFor="name" disabled>
                NAME
                <Input
                  type="text"
                  id="name"
                  placeholder="e.g. Team Awesome"
                  value={name}
                  disabled
                />
              </Label>

              <Description>
                Use something simple. Like the name of your organization or
                team.
              </Description>
            </FormSection>

            <FormSection>
              <Label htmlFor="slug" disabled>
                SLUG
                <Input
                  type="text"
                  id="slug"
                  placeholder="e.g. team-awesome"
                  value={slug}
                  disabled
                />
              </Label>

              <Description>
                A unique identifier that should be easy to read. Keep it short.
              </Description>
            </FormSection>
          </Form>
        </FormWrapper>
      </Section>
    </Content>
  );
}

PureWorkspaceSettings.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchErr: PropTypes.object,
  id: PropTypes.string,
  createdBy: PropTypes.string,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  name: PropTypes.string,
  slug: PropTypes.string
};

function WorkspaceSettings() {
  const [workspace] = useWorkspace();

  return <PureWorkspaceSettings {...workspace} />;
}

export default WorkspaceSettings;
