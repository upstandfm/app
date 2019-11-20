import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

export const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const MenuItem = styled.li`
  display: inline-block;
  margin: 0 2em 0 0;
  padding: 0;
`;

const StyledLink = styled(Link)`
  margin: 0 0.5em 0 0;
  padding: 0.25em 0;
  text-decoration: none;
  border-bottom: 3px solid var(--color-darkest-purple);
  transition: all 0.2s ease;

  :hover {
    color: var(--color-white) !important;
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
        color: 'var(--color-white)',
        borderColor: 'var(--color-lighter-purple)'
      };

      return {
        style: isCurrent ? activeStyle : normalStyle
      };
    }}
  />
);
