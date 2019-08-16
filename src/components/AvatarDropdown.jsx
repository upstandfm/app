import React from 'react';
import PropTypes from 'prop-types';

import useOutsideClicks from '../hooks/use-outside-clicks';
import useMatchMedia from '../hooks/use-match-media';

import {
  Dropdown,
  Trigger,
  List,
  ListItem,
  ListItemText,
  Divider
} from './Dropdown';

import Avatar from './Avatar';

const SMALL_SCREEN_MEDIA_QUERY = '(max-width: 1000px)';

function AvatarDropdown({ logout, avatarUrl, fullName, email }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const [dropdownEl] = useOutsideClicks(handleClose);

  const handleClick = () => {
    setIsOpen(s => !s);
  };

  const [isSmallScreen] = useMatchMedia(SMALL_SCREEN_MEDIA_QUERY);

  const alignOptions = {
    top: isSmallScreen ? '58px' : 'auto',
    right: isSmallScreen ? '21px' : 'auto',
    bottom: !isSmallScreen ? '23px' : 'auto',
    left: !isSmallScreen ? '143px' : 'auto'
  };

  return (
    <Dropdown ref={dropdownEl}>
      <Trigger onClick={handleClick}>
        <Avatar src={avatarUrl} />
      </Trigger>

      <List isOpen={isOpen} {...alignOptions}>
        <ListItem viewOnly>
          <ListItemText>
            <b>{fullName}</b>
          </ListItemText>

          <ListItemText>{email}</ListItemText>
        </ListItem>

        <Divider />

        <ListItem onClick={logout}>Logout</ListItem>
      </List>
    </Dropdown>
  );
}

AvatarDropdown.propTypes = {
  logout: PropTypes.func.isRequired,
  avatarUrl: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

export default AvatarDropdown;
