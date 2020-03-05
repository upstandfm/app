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

import Button from '../components/Button';
import { formatDate } from '../utils';
import { useUser } from '../auth0';

import Loading from './Loading';
import { Info, InvitesWrapper, EmptyMessage } from './Layout';
import { InviteList, InviteListItem, Email, Meta } from './InviteList';
import Status from './Status';

import inviteReducer, { defaultInviteState } from './reducer';
import useFetchInvites from './use-fetch-invites';
import useCreateInvite from './use-create-invite';
import NewInvite from './NewInvite';

export function PureWorkspaceInvites({
  isLoading,
  invites,
  inviterFullName,
  createInvite,
  isCreating
}) {
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

          <NewInvite
            inviterFullName={inviterFullName}
            createInvite={createInvite}
            isCreating={isCreating}
          />
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
  ),
  inviterFullName: PropTypes.string.isRequired,
  createInvite: PropTypes.func.isRequired,
  isCreating: PropTypes.bool.isRequired
};

function WorkspaceInvites() {
  const user = useUser();
  const [, snackbarDispatch] = useSnackbar();
  const [inviteState, inviteDispatch] = React.useReducer(
    inviteReducer,
    defaultInviteState
  );

  const [
    fetchInvites,
    abortFetchInvites,
    isFetching,
    fetchErr
  ] = useFetchInvites(inviteDispatch);

  const [
    createInvite,
    abortCreateInvite,
    isCreating,
    createErr
  ] = useCreateInvite(inviteDispatch);

  React.useEffect(() => {
    fetchInvites();

    return () => {
      abortFetchInvites();
      abortCreateInvite();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (fetchErr) {
      snackbarDispatch({
        type: 'ENQUEUE_SNACKBAR_MSG',
        data: {
          type: 'error',
          title: 'Failed to fetch workspace invites',
          text: fetchErr.details
            ? `${fetchErr.message}: ${fetchErr.details}`
            : fetchErr.message
        }
      });
    }

    if (createErr) {
      snackbarDispatch({
        type: 'ENQUEUE_SNACKBAR_MSG',
        data: {
          type: 'error',
          title: 'Failed to send workspace invite',
          text: createErr.details
            ? `${createErr.message}: ${createErr.details}`
            : createErr.message
        }
      });
    }
  }, [fetchErr, createErr]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PureWorkspaceInvites
      isLoading={isFetching}
      invites={inviteState}
      inviterFullName={user.fullName}
      createInvite={createInvite}
      isCreating={isCreating}
    />
  );
}

export default WorkspaceInvites;
