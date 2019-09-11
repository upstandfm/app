import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Dropdown = styled.div`
  position: relative;
`;

export const Trigger = styled.button`
  display: block;
  padding: 0;
  margin: 0 auto;
  border: 0;
  border-radius: 4px;
  background: none;
  color: var(--color-dark-grey);
  font-size: 1em;
  line-height: 1;
  transition: all 0.2s ease;

  :hover {
    cursor: pointer;
  }
`;

/**
 * Show list:
 *  <List isOpen={true} />
 *
 * Hide list:
 *  <List isOpen={false} />
 *
 * Open list up:
 *  <List dropDirection="up" />
 *
 * Open list down:
 *  <List dropDirection="down" />
 *
 * Align list left:
 *  <List alignSelf="left" />
 *
 * Align list right:
 *  <List alignSelf="right" />
 */
export const List = styled.ul`
  list-style: none;
  position: absolute;
  z-index: 999;
  margin: 0.25em 0;
  padding: 1em 0;
  min-width: 220px;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.1);
  background-color: var(--color-white);
  border-radius: 8px;
  border: 1px solid var(--color-lighter-grey);
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  bottom: ${props => (props.dropDirection === 'up' ? '100%' : '')};
  top: ${props => (props.dropDirection === 'down' ? '100%' : '')};
  left: ${props => (props.alignSelf === 'left' ? '0' : '')};
  right: ${props => (props.alignSelf === 'right' ? '0' : '')};
`;

List.propTypes = {
  dropDirection: PropTypes.oneOf(['up', 'down']),
  alignSelf: PropTypes.oneOf(['left', 'right'])
};

/**
 * List item that can be clicked on:
 *  <ListItem>Logout</ListItem>
 *
 * List item that can't be clicked on:
 *  <ListItem viewOnly>Name</ListItem>
 */
export const ListItem = styled.li`
  position: relative;
  padding: 0;
  line-height: 1;
  color: var(--color-dark-grey);
`;

ListItem.propTypes = {
  viewOnly: PropTypes.bool
};

export const ListItemText = styled.span`
  display: block;
  padding: 0.25em 1em;
  font-weight: ${props => (props.primary ? 'bold' : 'normal')};
  color: ${props => (props.secondary ? 'var(--color-grey)' : 'inherit')};
`;

export const Divider = styled.div`
  height: 0;
  margin: 1em 0;
  padding: 0;
`;
