import React from 'react';
import styled, { keyframes } from 'styled-components';

import Cards from './Cards';
import { Title } from './Card';

export const LoadingCards = styled(Cards)``;

const Container = styled.li`
  width: 235px;
  list-style: none;
  margin: 0;
  padding: 0;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  background-color: var(--color-lightest-grey);

  :hover {
    cursor: wait;
  }

  @media (max-width: 470px) {
    width: 100%;
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
  text-shadow: none;
  border-radius: 33px;
  color: transparent;
  background-color: var(--color-lighter-grey);
  background-repeat: no-repeat;
  background-image: linear-gradient(
    90deg,
    var(--color-lighter-grey),
    var(--color-lightest-grey),
    var(--color-lighter-grey)
  );
  background-size: 100% 100%;
  animation: ${glimmer} 1s ease-in-out infinite;
`;

export function LoadingCard() {
  return (
    <Container>
      <Wrapper>
        <LoadingTitle>A loading title</LoadingTitle>
      </Wrapper>
    </Container>
  );
}
