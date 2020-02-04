import React from 'react';
import PropTypes from 'prop-types';

import { useSnackbar } from '../Snackbar';
import Dropdown, { DropdownSection, DropdownItem } from '../Dropdown';
import Avatar from '../Avatar';

import LoadingWorkspace from './Loading';

import {
  Trigger,
  WorkspaceName,
  Icon,
  User,
  UserInfo,
  FullName,
  Email,
  BlankButton
} from './Layout';

export function PureWorkspaceDropdown({
  isLoading,
  workspaceName,
  userAvatarUrl,
  userFullName,
  userEmail,
  logout
}) {
  if (isLoading) {
    return <LoadingWorkspace />;
  }

  const buttonRefs = [React.createRef()];

  return (
    <Dropdown
      width="220px"
      refs={buttonRefs}
      triggerEl={
        <Trigger>
          <WorkspaceName title={workspaceName}>{workspaceName}</WorkspaceName>
          <Icon icon="chevron-down" size="sm" />
        </Trigger>
      }
    >
      <DropdownSection>
        <User>
          <Avatar
            size="40px"
            title={userFullName}
            fullName={userFullName}
            avatarUrl={userAvatarUrl}
          />

          <UserInfo>
            <FullName title={userFullName}>{userFullName}</FullName>
            <Email title={userEmail}>{userEmail}</Email>
          </UserInfo>
        </User>
      </DropdownSection>

      <DropdownSection>
        <DropdownItem>
          <BlankButton ref={buttonRefs[0]} role="menuitem" onClick={logout}>
            Logout
          </BlankButton>
        </DropdownItem>
      </DropdownSection>
    </Dropdown>
  );
}

PureWorkspaceDropdown.defaultProps = {
  workspaceName: 'Workspace',
  userFullName: 'User',
  userEmail: 'email'
};

PureWorkspaceDropdown.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  workspaceName: PropTypes.string,
  userAvatarUrl: PropTypes.string,
  userFullName: PropTypes.string,
  userEmail: PropTypes.string,
  logout: PropTypes.func.isRequired
};

function WorkspaceDropdown({ user, workspace, logout }) {
  const [, snackbarDispatch] = useSnackbar();

  const { fetchErr } = workspace;
  React.useEffect(() => {
    if (!fetchErr) {
      return;
    }

    snackbarDispatch({
      type: 'ENQUEUE_SNACKBAR_MSG',
      data: {
        type: 'error',
        title: 'Failed to fetch workspace',
        text: fetchErr.details
          ? `${fetchErr.message}: ${fetchErr.details}`
          : fetchErr.message
      }
    });
  }, [fetchErr]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PureWorkspaceDropdown
      isLoading={workspace.isFetching}
      workspaceName={workspace.name}
      userAvatarUrl={user.avatarUrl}
      userFullName={user.fullName}
      userEmail={user.email}
      logout={logout}
    />
  );
}

WorkspaceDropdown.propTypes = {
  user: PropTypes.shape({
    workspaceId: PropTypes.string.isRequired,
    userId: PropTypes.string,
    email: PropTypes.string,
    emailIsVerified: PropTypes.bool,
    avatarUrl: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    updatedAt: PropTypes.string
  }),
  workspace: PropTypes.shape({
    isFetching: PropTypes.bool.isRequired,
    fetchErr: PropTypes.object,
    id: PropTypes.string,
    createdBy: PropTypes.string,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string
  }),
  logout: PropTypes.func.isRequired
};

export default WorkspaceDropdown;
