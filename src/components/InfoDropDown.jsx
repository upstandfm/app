import React from 'react';
import styled from 'styled-components';

import useOutsideClicks from '../hooks/use-outside-clicks';
import useMatchMedia from '../hooks/use-match-media';

import {
  Dropdown,
  Trigger,
  List,
  ListItem,
  ListItemText,
  ListItemLink,
  Divider
} from './Dropdown';

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
      top: '58px',
      left: '26px',
      right: '26px'
    };
  }

  if (isMediumScreen) {
    return {
      top: '-1px',
      right: '58px'
    };
  }

  // Default positioning, i.e. "large" screen
  return {
    bottom: '-1px',
    left: '130px'
  };
};

const Info = styled.div`
  display: grid;
  align-content: center;
  width: 42px;
  height: 42px;
  border: 1px solid ${props => props.theme.accentColor};
  border-radius: 50%;
  background-color: var(--color-white);
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Nunito', sans-serif;
  font-size: 20px;
`;

function InfoDropdown() {
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
        <Info>?</Info>
      </Trigger>

      <List isOpen={isOpen} {...alignOptions}>
        <ListItem>
          <ListItemLink href="" target="_blank">
            what's new?
          </ListItemLink>
        </ListItem>

        <ListItem>
          <ListItemLink href="" target="_blank">
            help
          </ListItemLink>
        </ListItem>

        <ListItem>
          <ListItemLink href="" target="_blank">
            terms & privacy
          </ListItemLink>
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemLink
            href="mailto:hi@upstand.fm?subject=Hi there!"
            target="_blank"
          >
            say hi!
          </ListItemLink>
        </ListItem>

        <ListItem>
          <ListItemLink href="https://danillouz.dev" target="_blank">
            about
          </ListItemLink>
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemLink href="https://blog.danillouz.dev" target="_blank">
            blog
          </ListItemLink>
        </ListItem>

        <ListItem>
          <ListItemLink href="https://github.com/upstandfm" target="_blank">
            GitHub
          </ListItemLink>
        </ListItem>

        <Divider />

        <ListItem viewOnly>
          <ListItemText>
            &copy; {new Date().getFullYear()} Upstand FM
          </ListItemText>
        </ListItem>
      </List>
    </Dropdown>
  );
}

export default InfoDropdown;
