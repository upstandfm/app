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

const SMALL_SCREEN_MEDIA_QUERY = '(max-width: 550px)';
const MEDIUM_SCREEN_MEDIA_QUERY = '(max-width: 1000px)';

/**
 * Creates correct alignment props based on screen size.
 *
 * @param {Boolean} isSmallScreen
 * @param {Boolean} isMediumScreen
 *
 * @return {Object} May contain props: "top", "left", "right", "bottom" in pixels
 */
const _getAlignOptions = (isSmallScreen, isMediumScreen) => {
  // Note that a "medium" screen query also is "true" when the screen
  // is "medium". Therefore, ALWAYS FIRST check is the screen is small.
  if (isSmallScreen) {
    return {
      top: '63px',
      left: '26px',
      right: '26px'
    };
  }

  if (isMediumScreen) {
    return {
      top: '-1px',
      left: '63px'
    };
  }

  // Default positioning, i.e. "large" screen
  return {
    top: '-1px',
    left: '132px'
  };
};

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
  const [isMediumScreen] = useMatchMedia(MEDIUM_SCREEN_MEDIA_QUERY);
  const alignOptions = _getAlignOptions(isSmallScreen, isMediumScreen);

  return (
    <Dropdown ref={dropdownEl}>
      <Trigger onClick={handleClick}>
        <Avatar src={avatarUrl} />
      </Trigger>

      <List isOpen={isOpen} {...alignOptions}>
        <ListItem viewOnly>
          <ListItemText>{fullName}</ListItemText>

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
