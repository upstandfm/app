import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Avatar, { AvatarContainer } from '../components/Avatar';

export const Members = styled.ul`
  display: inline-flex;
  flex-direction: row-reverse;
  margin: 0;
  padding: 0;
`;

const MemberContainer = styled.li`
  display: inline-block;
  margin-right: -10px;
`;

export function Member({ userFullName, avatarUrl }) {
  return (
    <MemberContainer>
      <Avatar
        title={userFullName}
        fullName={userFullName}
        avatarUrl={avatarUrl}
        altText={`avatar of ${userFullName}`}
      />
    </MemberContainer>
  );
}

Member.propTypes = {
  userFullName: PropTypes.string,
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