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
  background: none;
  color: inherit;
  font-size: 1em;
  line-height: 1;

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
  padding: 0.5em 0;
  min-width: 240px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.accentColor};
  opacity: ${props => (props.isOpen ? 1 : 0)};
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

const _getListItemBackgroundColor = props => {
  if (props.viewOnly) {
    return 'inherit';
  }

  return props.theme.accentColor;
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
  padding: 0.5em 1em;
  font-weight: ${props => (props.viewOnly ? 'inherit' : 'bold')};
  line-height: 1;

  :hover {
    cursor: ${props => (props.viewOnly ? 'inherit' : 'pointer')};
    background-color: ${_getListItemBackgroundColor};
  }
`;

ListItem.propTypes = {
  viewOnly: PropTypes.bool
};

export const ListItemText = styled.span`
  display: block;
  padding: 0.25em;
`;

export const ListItemLink = styled.a`
  display: block;

  && {
    color: inherit;
    text-decoration: none;

    :visited {
      color: inherit;
    }
  }
`;

export const Divider = styled.div`
  height: 0;
  margin: 0.25em 0;
  padding: 0;
  border-top: 1px solid ${props => props.theme.accentColor};
`;
