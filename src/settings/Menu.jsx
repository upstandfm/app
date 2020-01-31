import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Menu = styled.ul`
  display: block;
  list-style: none;
  background-color: var(--color-white);
  border: 1px solid var(--color-light-grey);
  border-radius: var(--radius-size);
  margin: 0;
  padding: 0;
`;

const MenuItem = styled.li`
  border-bottom: 1px solid var(--color-light-grey);

  :last-child {
    border: none;
  }
`;

const StyledLink = styled(NavLink)`
  display: block;
  margin: 0;
  padding: 8px 16px;
  text-decoration: none;
  color: var(--color-dark-grey);
  border-left: 3px solid transparent;
  transition: all 0.1s linear;

  :hover {
    background-color: var(--color-light-grey);
    color: var(--color-darker-grey) !important;
  }
`;

export const MenuLink = props => (
  <MenuItem>
    <StyledLink
      {...props}
      activeStyle={{
        color: 'var(--color-darkest-grey)',
        borderLeft: '3px solid var(--color-light-purple)',
        fontWeight: 'bold'
      }}
    />
  </MenuItem>
);
