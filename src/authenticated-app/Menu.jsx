import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

export const Menu = styled.div``;

const StyledLink = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.75em;
  align-items: center;
  margin: 0;
  padding: 0.1em 1em;
  text-decoration: none;
  min-height: 27px;
  transition: all 0.1s linear;

  :hover {
    background-color: var(--color-lightest-purple);
    color: var(--color-darkest-purple) !important;
  }
`;

export const MenuLink = props => (
  <StyledLink
    {...props}
    getProps={({ isCurrent }) => {
      const normalStyles = {
        color: 'var(--color-white)'
      };

      const activeStyles = {
        color: 'var(--color-darkest-purple)',
        backgroundColor: 'var(--color-lighter-purple)'
      };

      return {
        style: isCurrent ? activeStyles : normalStyles
      };
    }}
  />
);
