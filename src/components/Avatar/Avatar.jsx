import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getFullNameInitials } from './utils';

export const AvatarContainer = styled.div`
  position: relative;
  display: grid;
  align-items: center;
  justify-items: center;
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
  background-color: var(--color-lightest-purple);
  color: var(--color-dark-purple);

  :hover {
    cursor: default;
  }
`;

const Image = styled.img`
  position: absolute;
  display: ${props => (Boolean(props.src) ? 'block' : 'none')};
  top: 0;
  left: 0;
  border: 0;
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
`;

export default function Avatar({
  size,
  title,
  fullName,
  avatarUrl,
  altText,
  ...props
}) {
  // API returns "null" by default
  const initials = getFullNameInitials(fullName || '');

  return (
    <AvatarContainer size={size} title={title} {...props}>
      {initials}
      <Image size={size} src={avatarUrl} alt={altText} />
    </AvatarContainer>
  );
}

Avatar.propTypes = {
  size: PropTypes.string,
  title: PropTypes.string,
  fullName: PropTypes.string,
  avatarUrl: PropTypes.string,
  altText: PropTypes.string
};

Avatar.defaultProps = {
  size: '32px',
  altText: 'user avatar image'
};
