import styled, { keyframes } from 'styled-components';

const glitch = keyframes`
  0% {
    transform: translate(0);
  }

  2% {
    transform: translate(-3px, 3px);
  }

  4% {
    transform: translate(-3px, -3px);
  }

  6% {
    transform: translate(3px, 3px);
  }

  8% {
    transform: translate(3px, -3px);
  }

  10% {
    transform: translate(0, 0);
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

  &:before {
    color: #01ffff;
    z-index: -1;
    animation: ${glitch} 4s ease-in-out 0s infinite normal both;
    -webkit-animation: ${glitch} 4s ease-in-out 0s infinite normal both;
  }

  &:after {
    color: #ff01ff;
    z-index: -2;
    animation: ${glitch} 4s ease-in-out 0.1s infinite normal both;
    -webkit-animation: ${glitch} 4s ease-in-out 0.1s infinite normal both;
  }
`;

export default Glitch;
