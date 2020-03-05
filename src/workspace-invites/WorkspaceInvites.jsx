import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSnackbar } from '../components/Snackbar';

import Content, {
  Title,
  Subtitle,
  Section,
  SectionWrapper,
  SectionTitle
} from '../components/Content';

import {
  Form,
  Section as FormSection,
  Input,
  Description
} from '../components/Form';

import Button from '../components/Button';
import { formatDate } from '../utils';

import Loading from './Loading';
import { Info, InvitesWrapper, CustomFormLabel, EmptyMessage } from './Layout';
import { InviteList, InviteListItem, Email, Meta } from './InviteList';
import Status from './Status';

export function PureWorkspaceInvites({ isLoading, invites }) {
  if (isLoading) {
    return <Loading />;
  }

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

          <Form>
            <FormSection>
              <CustomFormLabel htmlFor="email">
                <Input type="email" id="email" placeholder="user@domain.com" />

                <Button tertiary disabled>
                  Send invite
                </Button>
              </CustomFormLabel>

              <Description></Description>
            </FormSection>
          </Form>
        </InvitesWrapper>
      </Section>

      <Section>
        <SectionWrapper>
          <SectionTitle>Invites</SectionTitle>

          {invites.length === 0 ? (
            <EmptyMessage>No invites to show.</EmptyMessage>
          ) : (
            <InviteList>
              {invites.map(invite => {
                const {
                  id,
                  email,
                  status,
                  inviterFullName,
                  createdAt
                } = invite;
                const createdEpoch = new Date(createdAt).getTime();
                const invitedAt = formatDate(createdEpoch);
                return (
                  <InviteListItem key={id}>
                    <Email title={email}>{email}</Email>

                    <Status status={status}>{status}</Status>

                    <Meta
                      title={`Invited by ${inviterFullName} on ${createdAt}`}
                    >
                      Invited by {inviterFullName}
                      <br />
                      on {invitedAt}
                    </Meta>

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
                  </InviteListItem>
                );
              })}
            </InviteList>
          )}
        </SectionWrapper>
      </Section>
    </Content>
  );
}

PureWorkspaceInvites.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  invites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      inviterFullName: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['pending', 'accepted', 'error'])
    })
  )
};

function WorkspaceInvites() {
  const [, snackbarDispatch] = useSnackbar();
  // const [invitesState, invitesDispatch] = React.useReducer(
  //   invitesReducer,
  //   defaultInvitesState
  // );

  // const [fetchInvites, abortFetchInvites, isFetching, err] = useFetchInvites(
  //   invitesDispatch
  // );

  React.useEffect(() => {
    // fetchInvites();

    return () => {
      // abortFetchInvites();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // React.useEffect(() => {
  //   if (!err) {
  //     return;
  //   }

  //   snackbarDispatch({
  //     type: 'ENQUEUE_SNACKBAR_MSG',
  //     data: {
  //       type: 'error',
  //       title: 'Failed to fetch workspace invites',
  //       text: err.details ? `${err.message}: ${err.details}` : err.message
  //     }
  //   });
  // }, [err]); // eslint-disable-line react-hooks/exhaustive-deps

  return <PureWorkspaceInvites isLoading={false} members={[]} />;
}

export default WorkspaceInvites;
