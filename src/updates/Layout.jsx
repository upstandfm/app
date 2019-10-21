import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;
  grid-gap: 1em;
  align-items: center;
  padding: 1em;
`;

export const Actions = styled.div`
  display: grid;
  justify-items: end;
  padding: 2em 0;

  @media (max-width: 470px) {
    justify-items: center;
    padding: 1em 0;
  }
`;

export const Main = styled.div``;

export const Subtitle = styled.h2`
  display: inline-block;
  margin: 0 0 0.5em 0;
  font-weight: normal;
  color: ${props => (props.isToday ? 'var(--color-purple)' : 'inherit')};
`;

Subtitle.propTypes = {
  isToday: PropTypes.bool
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
  border-radius: 33px;
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
