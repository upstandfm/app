import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

const Title = styled.h2`
  display: inline-block;
  vertical-align: middle;
  margin: 0 0.5em 0 0;
  color: var(--color-darkest-purple);
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 480px) {
    margin: 0;
  }
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
  animation: ${glimmer} 1s ease-in-out infinite;
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
