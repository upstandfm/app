import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Content, {
  Title,
  Subtitle,
  Section,
  SectionWrapper,
  SectionTitle
} from '../components/Content';

import { Skeleton } from '../components/Loading';
import Button from '../components/Button';

import { LoadingNewInvite } from './NewInvite';
import { Info, InvitesWrapper } from './Layout';
import { InviteList, LoadingInviteListItem, Email, Meta } from './InviteList';
import Status from './Status';

function Loading() {
  return (
    <Content>
      <Title>Add members</Title>
      <Subtitle>Invite users to your workspace.</Subtitle>

      <Section>
        <InvitesWrapper>
          <Info>
            <FontAwesomeIcon icon="info-circle" size="sm" /> New members will
            receive an email with a link to accept the invite.
          </Info>

          <LoadingNewInvite />
        </InvitesWrapper>
      </Section>

      <Section>
        <SectionWrapper>
          <SectionTitle>Invites</SectionTitle>

          <InviteList>
            <LoadingInviteListItem>
              <Skeleton as={Email}>loading email</Skeleton>
              <Skeleton as={Status}>loading sts</Skeleton>
              <Skeleton as={Meta}>
                Loading inviter name
                <br />
                loading invite date
              </Skeleton>

              <div>
                <Button
                  size="small"
                  tertiary
                  disabled
                  title="Not implemented yet"
                >
                  <FontAwesomeIcon icon="ellipsis-h" />
                </Button>
              </div>
            </LoadingInviteListItem>

            <LoadingInviteListItem>
              <Skeleton as={Email}>loading email</Skeleton>
              <Skeleton as={Status}>loading sts</Skeleton>
              <Skeleton as={Meta}>
                Loading inviter name
                <br />
                loading invite date
              </Skeleton>

              <div>
                <Button
                  size="small"
                  tertiary
                  disabled
                  title="Not implemented yet"
                >
                  <FontAwesomeIcon icon="ellipsis-h" />
                </Button>
              </div>
            </LoadingInviteListItem>

            <LoadingInviteListItem>
              <Skeleton as={Email}>loading email</Skeleton>
              <Skeleton as={Status}>loading sts</Skeleton>
              <Skeleton as={Meta}>
                Loading inviter name
                <br />
                loading invite date
              </Skeleton>

              <div>
                <Button
                  size="small"
                  tertiary
                  disabled
                  title="Not implemented yet"
                >
                  <FontAwesomeIcon icon="ellipsis-h" />
                </Button>
              </div>
            </LoadingInviteListItem>
          </InviteList>
        </SectionWrapper>
      </Section>
    </Content>
  );
}

export default Loading;
