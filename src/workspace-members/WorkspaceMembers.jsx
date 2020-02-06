import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useSnackbar } from '../components/Snackbar';
import Content, { Title, Subtitle, Section } from '../components/Content';
import Avatar from '../components/Avatar';
import Button from '../components/Button';

import { UserList, UserListItem, UserInfo, FullName, Email } from './UserList';
import Loading from './Loading';
import Empty from './Empty';

import membersReducer, { defaultMembersState } from './reducer';
import useFetchMembers from './use-fetch-members';

export function PureWorkspaceMembers({ isLoading, members }) {
  if (isLoading) {
    return <Loading />;
  }

  if (members.length === 0) {
    return <Empty />;
  }

  return (
    <Content>
      <Title>Workspace members</Title>
      <Subtitle>View and manage all users in your workspace.</Subtitle>

      <Section>
        <UserList>
          {members.map(member => {
            const { fullName, email } = member;
            return (
              <UserListItem key={member.id}>
                <Avatar size="40px" fullName={fullName} />

                <UserInfo>
                  <FullName title={fullName}>{fullName}</FullName>
                  <Email title={email}>{email}</Email>
                </UserInfo>

                <div>
                  <Button
                    size="small"
                    tertiary
                    disabled
                    title="not implemented yet"
                  >
                    <FontAwesomeIcon icon="ellipsis-h" />
                  </Button>
                </div>
              </UserListItem>
            );
          })}
        </UserList>
      </Section>
    </Content>
  );
}

PureWorkspaceMembers.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      createdBy: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
      fullName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired
    })
  )
};

function WorkspaceMembers() {
  const [, snackbarDispatch] = useSnackbar();
  const [membersState, membersDispatch] = React.useReducer(
    membersReducer,
    defaultMembersState
  );

  const [fetchMembers, abortFetchMembers, isFetching, err] = useFetchMembers(
    membersDispatch
  );

  React.useEffect(() => {
    fetchMembers();

    return () => {
      abortFetchMembers();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!err) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to fetch workspace members',
        text: err.details ? `${err.message}: ${err.details}` : err.message
      }
    });
  }, [err]); // eslint-disable-line react-hooks/exhaustive-deps

  return <PureWorkspaceMembers isLoading={isFetching} members={membersState} />;
}

export default WorkspaceMembers;
