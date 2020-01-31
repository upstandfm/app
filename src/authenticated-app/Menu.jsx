import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Menu = styled.div``;

const StyledLink = styled(NavLink)`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.75em;
  align-items: center;
  margin: 0;
  padding: 0.1em 1em;
  text-decoration: none;
  color: var(--color-dark-grey);
  min-height: 27px;
  transition: all 0.1s linear;

  :hover {
    background-color: var(--color-light-grey);
    color: var(--color-darker-grey) !important;
  }
`;

export const MenuLink = props => (
  <StyledLink
    {...props}
    activeStyle={{
      color: 'var(--color-darkest-grey)',
      backgroundColor: 'var(--color-light-grey)',
      fontWeight: 'bold'
    }}
  />
);
