import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Questions = styled.ol`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-gap: 0.25em;
  counter-reset: update-progress;
`;

const Container = styled.li``;

const Header = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 0.75em;
  align-items: center;
  color: ${props =>
    props.isActive ? 'var(--color-purple)' : 'var(--color-lighter-purple)'};
`;

const StepCount = styled.div`
  counter-increment: update-progress;

  ::before {
    content: counter(update-progress);
    display: grid;
    align-content: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${props =>
      props.isActive ? 'var(--color-purple)' : 'var(--color-lighter-purple)'};
    color: var(--color-white);
    font-size: 1.2em;
  }
`;

const Title = styled.h2`
  margin: 0.75rem 0;
`;

const Subtitle = styled.h2`
  margin: 0 0 0.75rem 0;
  font-weight: normal;
`;

const Main = styled.div`
  margin: 0 0 0 15px;
  padding: 0.5em 1.75em;
  border-left: 2px solid;
  border-color: ${props =>
    props.isLast ? 'transparent' : 'var(--color-light-purple)'};
`;

const Divider = styled.div`
  margin: 0 0 0 15px;
  padding: 1em 0;
  border-left: 2px solid var(--color-lightest-purple);
`;

export function Question({
  isDone,
  isActive,
  isLast,
  title,
  subtitle,
  children
}) {
  return (
    <Container>
      <Header isActive={isActive}>
        <StepCount isActive={isActive} />

        <Title>
          {title} {isDone && <FontAwesomeIcon icon="check" size="sm" />}
        </Title>
      </Header>

      {isActive && (
        <Main isLast={isLast}>
          <Subtitle>{subtitle}</Subtitle>
          {children}
        </Main>
      )}

      {!isActive && !isLast && <Divider />}
    </Container>
  );
}

Question.propTypes = {
  isDone: PropTypes.bool,
  isActive: PropTypes.bool,
  isLast: PropTypes.bool,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired
};

Question.defaultProps = {
  isDone: false,
  isActive: false,
  isLast: false,
  title: PropTypes.string.isRequired
};
