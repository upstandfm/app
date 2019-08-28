import styled, { keyframes } from 'styled-components';

const colorNeonBlue = '#01ffff';
const colorNeonPink = '#ff01ff';

// This animation runs in 1/10th of the time to "simulate" an interval
const glitchInterval = keyframes`
  0% {
    transform: translate(0);
  }

  2% {
    transform: translate(-2px, 2px);
  }

  4% {
    transform: translate(-2px, -2px);
  }

  6% {
    transform: translate(2px, 2px);
  }

  8% {
    transform: translate(2px, -2px);
  }

  10% {
    transform: translate(0, 0);
  }

  /* Animation is finished here! */

  100% {
    transform: translate(0, 0);
  }
`;

const glitch = keyframes`
  0% {
    transform: translate(0);
  }

  20% {
    transform: translate(-2px, 2px);
  }

  40% {
    transform: translate(-2px, -2px);
  }

  60% {
    transform: translate(2px, 2px);
  }

  80% {
    transform: translate(2px, -2px);
  }

  100% {
    transform: translate(0, 0);
  }
`;

const Glitch = styled.span`
  position: relative;
  display: inline-block;
  z-index: 0;

  &:before,
  &:after {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0.7;
    content: attr(data-glitch-text);
  }
`;

export const GlitchOnInterval = styled(Glitch)`
  &:before {
    color: ${colorNeonBlue};
    z-index: -1;
    animation: ${glitchInterval} 3s ease-in-out 0s infinite normal both;
    -webkit-animation: ${glitchInterval} 3s ease-in-out 0s infinite normal both;
  }

  &:after {
    color: ${colorNeonPink};
    z-index: -2;
    animation: ${glitchInterval} 3s ease-in-out 0.1s infinite normal both;
    -webkit-animation: ${glitchInterval} 3s ease-in-out 0.1s infinite normal
      both;
  }
`;

export const GlitchOnHover = styled(Glitch)`
  :hover {
    &:before {
      color: ${colorNeonBlue};
      z-index: -1;
      animation: ${glitch} 0.3s ease-in-out 0s infinite normal both;
      -webkit-animation: ${glitch} 0.3s ease-in-out 0s infinite normal both;
    }

    &:after {
      color: ${colorNeonPink};
      z-index: -2;
      animation: ${glitch} 0.3s ease-in-out 0.1s infinite normal both;
      -webkit-animation: ${glitch} 0.3s ease-in-out 0.1s infinite normal both;
    }
  }
`;

export const GlitchAlways = styled(Glitch)`
  &:before {
    color: ${colorNeonBlue};
    z-index: -1;
    animation: ${glitch} 0.3s ease-in-out 0s infinite normal both;
    -webkit-animation: ${glitch} 0.3s ease-in-out 0s infinite normal both;
  }

  &:after {
    color: ${colorNeonPink};
    z-index: -2;
    animation: ${glitch} 0.3s ease-in-out 0.1s infinite normal both;
    -webkit-animation: ${glitch} 0.3s ease-in-out 0.1s infinite normal both;
  }
`;
