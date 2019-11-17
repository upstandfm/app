import React from 'react';
import styled, { keyframes } from 'styled-components';

import Cards from './Cards';
import { Container, Title } from './Card';

export const LoadingCards = styled(Cards)``;

const LoadingContainer = styled(Container).attrs(() => ({
  as: 'div'
}))`
  background-color: var(--color-lighter-grey);

  :hover {
    cursor: wait;
    box-shadow: 6px 6px 0 0 var(--color-darkest-purple);
  }
`;

const Wrapper = styled.div`
  height: 260px;
  padding: 1em;
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

export function LoadingCard() {
  return (
    <LoadingContainer>
      <Wrapper>
        <LoadingTitle>A loading title</LoadingTitle>
      </Wrapper>
    </LoadingContainer>
  );
}
