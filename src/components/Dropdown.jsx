import styled from 'styled-components';

export const Dropdown = styled.div`
  position: relative;
`;

export const Trigger = styled.button`
  display: block;
  padding: 0;
  margin: 0 auto;
  outline: 0;
  border: 0;
  background: none;
  color: inherit;
  font-size: 1em;
  line-height: 1;
  transition: all 0.2s ease;

  :hover {
    cursor: pointer;
    transform: scale(1.06);
  }
`;

/**
 * Show List:
 *  <List isOpen={true} />
 *
 * Hide List:
 *  <List isOpen={false} />
 *
 * Align List top right:
 *  <List top="60px" />
 *  <List right="15px" />
 *
 * Align List bottom left:
 *  <List bottom="15px" />
 *  <List left="165px" />
 */
export const List = styled.ul`
  list-style: none;
  position: absolute;
  top: ${props => props.top};
  right: ${props => props.right};
  bottom: ${props => props.bottom};
  left: ${props => props.left};
  z-index: 999;
  margin: 0;
  padding: 0.5em 0;
  min-width: 240px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  border: 1px solid #eaeaea;
  border-radius: 8px;
  background-color: #ffffff;
  opacity: ${props => (props.isOpen ? 1 : 0)};
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
`;

/**
 * List item that can be clicked on:
 *  <ListItem>Logout</ListItem>
 *
 * List item that can't be clicked on:
 *  <ListItem viewOnly>Name</ListItem>
 */
export const ListItem = styled.li`
  position: relative;
  padding: 1em;
  font-weight: ${props => (props.viewOnly ? 'inherit' : 600)};

  :hover {
    cursor: ${props => (props.viewOnly ? 'inherit' : 'pointer')};
    background-color: ${props => (props.viewOnly ? 'inherit' : '#eaeaea')};
  }
`;

export const ListItemText = styled.span`
  display: block;
  padding: 0.2em;
`;

export const Divider = styled.div`
  height: 0;
  margin: 0.25em 0;
  padding: 0;
  border-top: 1px solid #eaeaea;
`;