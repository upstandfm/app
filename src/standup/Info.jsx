import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const Title = styled.h2`
  margin: 0 0 0.5em 0;
  color: var(--color-darkest-purple);
`;

const glimmer = keyframes`
  0% {
    background-position: -235px 0;
  }
  100% {
    background-position: calc(235px + 100%) 0;
  }
`;

const LoadingTitle = styled(Title)`
  color: transparent;
  background-color: var(--color-light-grey);
  border-radius: var(--radius-size);
  background-repeat: no-repeat;
  background-image: linear-gradient(
    90deg,
    var(--color-light-grey),
    var(--color-lighter-grey),
    var(--color-light-grey)
  );
  background-size: 100% 100%;
  max-width: 220px;
  animation: ${glimmer} 1s ease-in-out infinite;

  @media (max-width: 770px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

export function LoadingInfo() {
  return <LoadingTitle>A loading tite</LoadingTitle>;
}

function Info({ standup }) {
  return <Title>{standup.standupName}</Title>;
}

Info.propTypes = {
  standup: PropTypes.shape({
    standupId: PropTypes.string.isRequired,
    standupName: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    updatedAt: PropTypes.number.isRequired
  })
};

export default Info;
