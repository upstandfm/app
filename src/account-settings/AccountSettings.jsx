import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useUser } from '../auth0';

import Content, {
  Title,
  Subtitle,
  Section,
  SectionWrapper
} from '../components/Content';
import Avatar from '../components/Avatar';
import Button from '../components/Button';

import {
  Form,
  Section as FormSection,
  Label,
  Input,
  Description
} from '../components/Form';

import { FormWrapper, Icon, DangerText } from './Layout';

export function PureAccountSettings({
  email,
  emailIsVerified,
  fullName,
  avatarUrl
}) {
  return (
    <>
      <Content>
        <Title>Account details</Title>
        <Subtitle>Your personal information and settings.</Subtitle>

        <Section>
          <SectionWrapper>
            <Avatar size="80px" fullName={fullName} avatarUrl={avatarUrl} />

            <FormWrapper>
              <Form>
                <FormSection>
                  <Label htmlFor="full-name" disabled>
                    FULL NAME
                    <Input
                      type="text"
                      id="full-name"
                      placeholder="e.g. Jane Doe"
                      value={fullName}
                      disabled
                    />
                  </Label>

                  <Description>Max. 70 chars.</Description>
                </FormSection>

                <FormSection>
                  <Label htmlFor="email" disabled>
                    EMAIL
                    <Input
                      type="text"
                      id="email"
                      placeholder="e.g. jane.doe@domain.com"
                      value={email}
                      disabled
                    />
                  </Label>

                  <Description>
                    {emailIsVerified ? (
                      <>
                        <Icon type="ok">
                          <FontAwesomeIcon icon="check-circle" />
                        </Icon>{' '}
                        Email address verified.
                      </>
                    ) : (
                      <>
                        <Icon type="warn">
                          <FontAwesomeIcon icon="exclamation-circle" />
                        </Icon>{' '}
                        Please verify your email address.
                      </>
                    )}
                  </Description>
                </FormSection>
              </Form>
            </FormWrapper>
          </SectionWrapper>
        </Section>
      </Content>

      <Content>
        <Title>Danger zone</Title>
        <Subtitle>Irreversible and destructive actions.</Subtitle>

        <Section>
          <SectionWrapper>
            <DangerText>
              Delete your account and all personal information.
            </DangerText>

            <Button primary disabled title="not implemented yet">
              Delete account
            </Button>
          </SectionWrapper>
        </Section>
      </Content>
    </>
  );
}

PureAccountSettings.propTypes = {
  userId: PropTypes.string.isRequired,
  workspaceId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  emailIsVerified: PropTypes.bool.isRequired,
  fullName: PropTypes.string.isRequired,
  avatarUrl: PropTypes.string
};

function AccountSettings() {
  const user = useUser();

  return <PureAccountSettings {...user} />;
}

export default AccountSettings;
