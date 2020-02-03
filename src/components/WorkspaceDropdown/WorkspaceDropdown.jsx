import React from 'react';
import PropTypes from 'prop-types';

import { useSnackbar } from '../Snackbar';
import Dropdown, { DropdownSection, DropdownItem } from '../Dropdown';

import LoadingWorkspace from './Loading';

import {
  Trigger,
  WorkspaceName,
  Icon,
  User,
  Avatar,
  UserInfo,
  FullName,
  Email,
  BlankButton
} from './Layout';

export function PureWorkspaceDropdown({
  isLoading,
  refs,
  workspaceName,
  userAvatarUrl,
  userFullName,
  userEmail,
  logout
}) {
  if (isLoading) {
    return <LoadingWorkspace />;
  }

  return (
    <Dropdown
      width="220px"
      refs={refs}
      triggerEl={
        <Trigger>
          <WorkspaceName title={workspaceName}>{workspaceName}</WorkspaceName>
          <Icon icon="chevron-down" size="sm" />
        </Trigger>
      }
    >
      <DropdownSection>
        <User>
          <Avatar data-testid="avatar" src={userAvatarUrl} alt="user avatar" />

          <UserInfo>
            <FullName title={userFullName}>{userFullName}</FullName>
            <Email title={userEmail}>{userEmail}</Email>
          </UserInfo>
        </User>
      </DropdownSection>

      <DropdownSection>
        <DropdownItem>
          <BlankButton ref={refs[0]} role="menuitem" onClick={logout}>
            Logout
          </BlankButton>
        </DropdownItem>
      </DropdownSection>
    </Dropdown>
  );
}

PureWorkspaceDropdown.defaultProps = {
  workspaceName: 'Workspace',
  userFullName: 'No user info',
  userEmail: 'No email'
};

PureWorkspaceDropdown.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  refs: PropTypes.array.isRequired,
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

  const dropdownRefs = [React.createRef()];

  return (
    <PureWorkspaceDropdown
      isLoading={workspace.isFetching}
      refs={dropdownRefs}
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
    workspaceId: PropTypes.string,
    userId: PropTypes.string,
    email: PropTypes.string,
    emailIsVerified: PropTypes.bool,
    avatarUrl: PropTypes.string,
    fullName: PropTypes.string,
    username: PropTypes.string,
    updatedAt: PropTypes.string
  }),
  workspace: PropTypes.shape({
    isFetching: PropTypes.bool,
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
