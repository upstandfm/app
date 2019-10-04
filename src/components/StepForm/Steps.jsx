import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Steps = styled.ol`
  list-style: none;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.total}, 1fr)`};
  grid-gap: 0.25em;
  margin: 0 0 3em 0;
  padding: 0;
  counter-reset: step-progress;
`;

Steps.propTypes = {
  total: PropTypes.number.isRequired
};

export const Step = styled.li`
  margin: 0;
  padding: 0.5em 0 0 0;
  border-top: 2px solid;
  border-color: ${props =>
    props.done || props.current
      ? 'var(--color-light-purple)'
      : 'var(--color-lightest-purple)'};
  color: ${props =>
    props.current ? 'var(--color-purple)' : 'var(--color-lighter-purple)'};
  counter-increment: step-progress;

  ::before {
    content: counter(step-progress) '. ';
  }
`;

Step.propTypes = {
  done: PropTypes.bool.isRequired,
  current: PropTypes.bool.isRequired
};
