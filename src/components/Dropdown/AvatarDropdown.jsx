import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useOutsideClicks from '../../hooks/use-outside-clicks';

import {
  Dropdown,
  Trigger,
  List,
  ListItem,
  ListItemText,
  Divider
} from './Dropdown';

const Avatar = styled.img`
  display: inline-block;
  width: 48px;
  height: 48px;
  border-radius: 4px;
  padding: 0;
  vertical-align: middle;
`;

function AvatarDropdown({
  logout,
  avatarUrl,
  fullName,
  email,
  dropDirection,
  alignSelf
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const [dropdownEl] = useOutsideClicks(handleClose);

  const handleClick = () => {
    setIsOpen(s => !s);
  };

  return (
    <Dropdown ref={dropdownEl}>
      <Trigger
        onClick={handleClick}
        aria-label="click here to see your profile or logout"
      >
        <Avatar data-testid="avatar" src={avatarUrl} alt="user avatar" />
      </Trigger>

      <List isOpen={isOpen} dropDirection={dropDirection} alignSelf={alignSelf}>
        <ListItem viewOnly tabindex="-1">
          <ListItemText data-testid="full-name">{fullName}</ListItemText>
          <ListItemText data-testid="email">{email}</ListItemText>
        </ListItem>

        <Divider />

        <ListItem onClick={logout} role="button" tabIndex="0">
          Logout
        </ListItem>
      </List>
    </Dropdown>
  );
}

AvatarDropdown.propTypes = {
  logout: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  dropDirection: PropTypes.oneOf(['up', 'down']),
  alignSelf: PropTypes.oneOf(['left', 'right'])
};

AvatarDropdown.defaultProps = {
  dropDirection: 'down',
  alignSelf: 'left'
};

/**
 * Dropdown menu, using an avatar image as the trigger.
 */
export default AvatarDropdown;
