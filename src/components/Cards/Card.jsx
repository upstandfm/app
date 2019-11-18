import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

export const Container = styled.li`
  width: 235px;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 2px solid var(--color-darkest-purple);
`;

export const WrapperLink = styled(Link)`
  display: grid;
  height: 260px;
  padding: 1em;
  text-decoration: none;
  background-color: var(--color-lighter-coral);
  transition: all 0.1s linear;

  :hover {
    background-color: var(--color-lightest-coral);
  }
`;

export const Title = styled.h2`
  margin: 0.25em 0;
  font-size: 26px;
  line-height: 1.2223;
  letter-spacing: 0.022em;
  color: var(--color-darkest-purple);
  word-break: break-word;
  overflow: auto;
`;

function Card({ title, linkTo }) {
  return (
    <Container>
      <WrapperLink data-testid="link" to={linkTo} title={title}>
        <Title>{title}</Title>
      </WrapperLink>
    </Container>
  );
}

Card.propTypes = {
  linkTo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default Card;
