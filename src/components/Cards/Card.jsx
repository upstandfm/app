import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';

const Container = styled.li`
  width: 240px;
  list-style: none;
  margin: 0;
  padding: 0;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  transition: all 0.2s ease;

  :hover {
    transform: scale(1.025);
    box-shadow: 0px 6px 8px 0px rgba(0, 0, 0, 0.25);
  }

  :focus-within {
    transform: scale(1.025);
    box-shadow: 0px 0px 0px 3px var(--color-light-coral);

    a:focus {
      text-decoration: none;
    }
  }

  @media (max-width: 470px) {
    width: 100%;
  }
`;

const WrapperLink = styled(Link)`
  display: grid;
  height: 260px;
  padding: 1em;
  border-radius: 16px;
  text-decoration: none;
  background-color: var(--color-darkest-purple);
  background-position: center center;
  background-size: cover;
  background-clip: border-box;
  background-repeat: repeat;
  background-image: ${props => `linear-gradient(
      rgba(0, 0, 0, 0.69) 0%,
      rgba(0, 0, 0, 0) 57%
    ),
    url(${props.bg})`};

  :focus {
    box-shadow: none;
    text-decoration: underline;
  }
`;

export const Title = styled.h2`
  margin: 0.25em 0;
  font-size: 26px;
  line-height: 1.2223;
  letter-spacing: 0.022em;
  color: var(--color-white);
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.6);
  overflow: hidden;
  text-overflow: ellipsis;
`;

function Card({ title, linkTo, bgImageUrl }) {
  return (
    <Container>
      <WrapperLink data-testid="link" to={linkTo} title={title} bg={bgImageUrl}>
        <Title>{title}</Title>
      </WrapperLink>
    </Container>
  );
}

Card.propTypes = {
  linkTo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bgImageUrl: PropTypes.string
};

export default Card;
