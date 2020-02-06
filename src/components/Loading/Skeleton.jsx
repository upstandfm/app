import styled, { keyframes } from 'styled-components';

const glimmer = keyframes`
  0% {
    background-position: -235px 0;
  }
  100% {
    background-position: calc(235px + 100%) 0;
  }
`;

const Skeleton = styled.div`
  color: transparent !important;
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

  :hover {
    cursor: wait;
  }
`;

export default Skeleton;
