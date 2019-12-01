import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

export const Menu = styled.ul`
  list-style: none;
  margin: 2em 0;
  padding: 0;
  list-style: none;
`;

export const MenuItem = styled.li``;

const StyledLink = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.75em;
  align-items: center;
  margin: 0;
  padding: 0.1em 1em 0.1em 1.5em;
  text-decoration: none;
  min-height: 27px;
  transition: all 0.2s ease;

  :hover {
    background-color: var(--color-lighter-purple);
    color: var(--color-darkest-purple) !important;
  }
`;

export const MenuLink = props => (
  <StyledLink
    {...props}
    getProps={({ isCurrent }) => {
      const normalStyle = {
        color: 'var(--color-light-grey)'
      };

      const activeStyle = {
        color: 'var(--color-darkest-purple)',
        backgroundColor: 'var(--color-lighter-purple)'
      };

      return {
        style: isCurrent ? activeStyle : normalStyle
      };
    }}
  />
);
