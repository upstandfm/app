import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 440px;
  box-sizing: border-box;
  margin: 0;
  padding: 0.75em 1em;
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.2);
  background-color: ${props => {
    const { type } = props;

    if (type === 'error') {
      return 'var(--color-lightest-red)';
    }

    if (type === 'success') {
      return 'var(--color-lightest-green)';
    }

    return 'var(--color-lightest-purple)';
  }};
  border-left: 5px solid;
  border-color: ${props => {
    const { type } = props;

    if (type === 'error') {
      return 'var(--color-red)';
    }

    if (type === 'success') {
      return 'var(--color-green)';
    }

    return 'var(--color-purple)';
  }};
  color: ${props => {
    const { type } = props;

    if (type === 'error') {
      return 'var(--color-dark-red)';
    }

    if (type === 'success') {
      return 'var(--color-dark-green)';
    }

    return 'var(--color-dark-purple)';
  }};
  transition: all 250ms ease-in-out;

  /* Get help from the GPU to avoid text "jankiness" */
  transform: translateZ(0);

  &.snackbar-msg-enter {
    transform: translateX(-100%);
    opacity: 0;
  }
  &.snackbar-msg-enter-active {
    transform: translateX(0);
    opacity: 1;
  }
  &.snackbar-msg-exit {
    transform: translateX(0);
    opacity: 1;
  }
  &.snackbar-msg-exit-active {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

const Title = styled.span`
  display: block;
  font-weight: bold;
`;

export function PureMessage({ index, message }) {
  return (
    <Container type={message.type} index={index}>
      {message.title && <Title>{message.title}</Title>}

      <span>{message.text}</span>
    </Container>
  );
}

PureMessage.propTypes = {
  index: PropTypes.number.isRequired,
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']),
    title: PropTypes.string.isRequired,
    text: PropTypes.string
  })
};

function Message({ timeout, message, index, dismissMessage }) {
  React.useEffect(() => {
    setTimeout(() => {
      dismissMessage(message.id);
    }, timeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <PureMessage index={index} message={message} />;
}

Message.propTypes = {
  timeout: PropTypes.number.isRequired,
  message: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['success', 'error']),
      title: PropTypes.string.isRequired,
      text: PropTypes.string
    })
  ),
  index: PropTypes.number.isRequired,
  dismissMessage: PropTypes.func.isRequired
};

export default Message;
