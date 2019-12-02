import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  max-width: 50rem;
  margin: 0 auto;
  padding: 1em;
`;

export const Subtitle = styled.h2`
  display: inline-block;
  margin: 0;
  font-weight: normal;

  :hover {
    cursor: ${props => (props.showHelp ? 'help' : 'inherit')};
  }
`;

Subtitle.propTypes = {
  showHelp: PropTypes.bool
};

const glimmer = keyframes`
  0% {
    background-position: -235px 0;
  }
  100% {
    background-position: calc(235px + 100%) 0;
  }
`;

export const LoadingSubtitle = styled(Subtitle)`
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

export const UpdatesContainer = styled.div`
  margin: 0 0 3em 0;
`;
export const LoadMoreContainer = styled.div`
  display: grid;
  align-items: center;
  margin: 0 0 3em 0;
`;
