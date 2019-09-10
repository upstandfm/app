import React from 'react';
import styled, { keyframes } from 'styled-components';

import Cards from './Cards';

export const LoadingCards = styled(Cards)``;

const Container = styled.li`
  width: 240px;
  list-style: none;
  margin: 0;
  padding: 0;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  background-color: var(--color-lighter-grey);

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
    background-position: -240px 0;
  }
  100% {
    background-position: calc(240px + 100%) 0;
  }
`;

const Title = styled.span`
  font-size: 26px;
  font-weight: bold;
  line-height: 1.2223;
  letter-spacing: 0.022em;
  border-radius: 33px;
  margin: 0.25em 0;
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
    <Container>
      <Wrapper>
        <Title>A loading title</Title>
      </Wrapper>
    </Container>
  );
}
