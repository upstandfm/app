import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Steps = styled.ol`
  list-style: none;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.total}, 1fr)`};
  grid-gap: 0.25em;
  margin: 1em 0 3em 0;
  padding: 0;
  counter-reset: standup-progress;
`;

Steps.propTypes = {
  total: PropTypes.number.isRequired
};

export const Step = styled.li`
  margin: 0;
  padding: 0.5em 0 0 0;
  border-top: 5px solid;
  border-color: ${props =>
    props.done || props.current
      ? 'var(--color-light-purple)'
      : 'var(--color-lightest-purple)'};
  color: ${props =>
    props.current ? 'var(--color-purple)' : 'var(--color-lighter-purple)'};
  counter-increment: standup-progress;

  ::before {
    content: counter(standup-progress) '. ';
  }
`;
