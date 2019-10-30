import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getFullNameInitials } from './utils';
export const Members = styled.ul`
  display: inline-flex;
  flex-direction: row-reverse;
  margin: 0;
  padding: 0;
`;

const MemberContainer = styled.li`
  display: inline-block;
  margin-right: -10px;

  :hover {
    cursor: default;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  justify-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: var(--color-lighter-grey);
  color: var(--color-dark-purple);
  font-weight: bold;
  border: 4px solid var(--color-white);
`;

const Avatar = styled.img`
  position: absolute;
  display: ${props => (Boolean(props.src) ? 'block' : 'none')};
  top: 0;
  left: 0;
  border: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export function Member({ userFullName, avatarUrl }) {
  const initials = getFullNameInitials(userFullName);
  return (
    <MemberContainer title={userFullName}>
      <AvatarContainer>
        {initials}
        <Avatar src={avatarUrl} alt="standup member avatar" />
      </AvatarContainer>
    </MemberContainer>
  );
}

Member.propTypes = {
  title: PropTypes.string,
  initials: PropTypes.string,
  avatarUrl: PropTypes.string
};

const Count = styled(AvatarContainer)`
  font-weight: normal;
  background-color: transparent;
  color: var(--color-grey);
`;

export function RestCount({ count }) {
  return (
    <MemberContainer title={`${count} more members`}>
      <Count>+{count}</Count>
    </MemberContainer>
  );
}

RestCount.propTypes = {
  count: PropTypes.number.isRequired
};

const LoadingContainer = styled(MemberContainer)`
  :hover {
    cursor: wait;
  }
`;

export function LoadingMember() {
  return (
    <LoadingContainer>
      <AvatarContainer />
    </LoadingContainer>
  );
}
