import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

export function Member({ title, initials, avatarUrl }) {
  return (
    <MemberContainer title={title}>
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
