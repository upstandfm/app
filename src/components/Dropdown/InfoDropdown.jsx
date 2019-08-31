import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import useOutsideClicks from '../../hooks/use-outside-clicks';

import Copyright from '../Copyright';
import { FOOTER_LINKS_BY_COLUMN } from '../Footer';

import {
  Dropdown,
  Trigger,
  List,
  ListItem,
  ListItemText,
  ListItemLink,
  Divider
} from './Dropdown';

const Info = styled.div`
  display: grid;
  align-content: center;
  width: 42px;
  height: 42px;
  background-color: #ffffff;
  font-size: 1.2em;
  font-weight: bold;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.accentColor};
`;

function InfoDropdown({ dropDirection, alignSelf }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const [dropdownEl] = useOutsideClicks(handleClose);

  const handleClick = () => {
    setIsOpen(s => !s);
  };

  const renderLinks = () => {
    const items = [];

    const maxColumns = FOOTER_LINKS_BY_COLUMN.length;
    for (let i = 0; i < maxColumns; i++) {
      const maxLinks = FOOTER_LINKS_BY_COLUMN[i].length;
      for (let j = 0; j < maxLinks; j++) {
        const link = FOOTER_LINKS_BY_COLUMN[i][j];
        items.push(
          <ListItem
            key={`footer-column-link-${link.name}`}
            role="button"
            tabIndex="0"
          >
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
      <Trigger
        onClick={handleClick}
        aria-label="click here to find out more about the app"
      >
        <Info data-testid="info">?</Info>
      </Trigger>

      <List isOpen={isOpen} dropDirection={dropDirection} alignSelf={alignSelf}>
        {renderLinks()}

        <ListItem viewOnly tabIndex="-1">
          <ListItemText>
            <Copyright />
          </ListItemText>
        </ListItem>
      </List>
    </Dropdown>
  );
}

InfoDropdown.propTypes = {
  dropDirection: PropTypes.oneOf(['up', 'down']),
  alignSelf: PropTypes.oneOf(['left', 'right'])
};

InfoDropdown.defaultProps = {
  dropDirection: 'down',
  alignSelf: 'left'
};

/**
 * Dropdown menu, using an info button as the trigger.
 */
export default InfoDropdown;
