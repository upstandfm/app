import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  z-index: 2;
`;

export const Trigger = styled.button`
  display: block;
  padding: 0;
  margin: 0;
  border: 0;
  background: none;
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
export const List = styled.div`
  position: absolute;
  z-index: 999;
  width: ${props => props.width};
  margin: 1em 0;
  box-shadow: rgba(25, 18, 56, 0.05) 0px 0px 0px 1px,
    rgba(25, 18, 56, 0.1) 0px 3px 6px, rgba(25, 18, 56, 0.2) 0px 8px 24px;
  background-color: var(--color-white);
  color: var(--color-dark-grey);
  border-radius: var(--radius-size);
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  bottom: ${props => (props.dropDirection === 'up' ? '100%' : '')};
  top: ${props => (props.dropDirection === 'down' ? '100%' : '')};
  left: ${props => (props.alignSelf === 'left' ? '0' : '')};
  right: ${props => (props.alignSelf === 'right' ? '0' : '')};
`;

List.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  dropDirection: PropTypes.oneOf(['up', 'down']),
  alignSelf: PropTypes.oneOf(['left', 'right'])
};

export const ListSection = styled.div`
  padding-top: 6px;
  padding-bottom: 6px;
  box-shadow: rgba(55, 53, 47, 0.09) 0px -1px 0px;
  margin-top: 1px;

  :first-child {
    box-shadow: none;
  }
`;

export const ListItem = styled.div``;
