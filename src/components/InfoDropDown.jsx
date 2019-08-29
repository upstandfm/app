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

import Copyright from './Copyright';

import { FOOTER_LINKS_BY_COLUMN } from './Footer';

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
  background-color: #ffffff;
  font-size: 1.2em;
  font-weight: bold;
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

  const renderLinks = () => {
    const items = [];

    const maxColumns = FOOTER_LINKS_BY_COLUMN.length;
    for (let i = 0; i < maxColumns; i++) {
      const maxLinks = FOOTER_LINKS_BY_COLUMN[i].length;
      for (let j = 0; j < maxLinks; j++) {
        const link = FOOTER_LINKS_BY_COLUMN[i][j];
        items.push(
          <ListItem key={`footer-column-link-${link.name}`}>
            <ListItemLink
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.name}
            </ListItemLink>
          </ListItem>
        );
      }

      items.push(<Divider key={`footer-column-${i}`} />);
    }

    return items;
  };

  return (
    <Dropdown ref={dropdownEl}>
      <Trigger onClick={handleClick}>
        <Info data-testid="info">?</Info>
      </Trigger>

      <List isOpen={isOpen} {...alignOptions}>
        {renderLinks()}

        <ListItem viewOnly>
          <ListItemText>
            <Copyright />
          </ListItemText>
        </ListItem>
      </List>
    </Dropdown>
  );
}

export default InfoDropdown;
