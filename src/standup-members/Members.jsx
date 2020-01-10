import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Avatar, { AvatarContainer } from '../components/Avatar';

export const Members = styled.ul`
  display: inline-flex;
  flex-direction: row-reverse;
  vertical-align: middle;
  margin: 0 0 0 -4px;
  padding: 0;
`;

const MemberContainer = styled.li`
  display: inline-block;
  margin-right: -10px;
`;

const CustomAvatar = styled(Avatar)`
  border: 4px solid var(--color-white);
`;

export function Member({ userFullName, avatarUrl }) {
  return (
    <MemberContainer>
      <CustomAvatar
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
  border: 4px solid var(--color-white);
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

const CustomAvatarContainer = styled(AvatarContainer)`
  background-color: var(--color-light-grey);
  border: 4px solid var(--color-white);
`;

export function LoadingMember() {
  return (
    <MemberContainer>
      <CustomAvatarContainer />
    </MemberContainer>
  );
}
