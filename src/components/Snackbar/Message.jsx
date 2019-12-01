import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  bottom: 1em;
  right: 1em;
  max-width: 440px;
  box-sizing: border-box;
  margin: 0;
  padding: 0.75em 1em;
  box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.2);
  border-radius: 0 var(--radius-size) var(--radius-size) 0;
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
    transform: translateX(100%);
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
    transform: translateX(100%);
    opacity: 0;
  }

  z-index: 2;
`;

const Meta = styled.span`
  display: block;
  margin: 1.25em 0 0 0;
  opacity: 0.65;
  text-align: right;
`;

const Title = styled.span`
  display: block;
  font-weight: bold;
  line-height: 1.4414;
`;

export function PureMessage({ index, message, queuedCount }) {
  return (
    <Container
      type={message.type}
      index={index}
      role="status"
      aria-live="polite"
    >
      {message.title && <Title>{message.title}</Title>}

      <span>{message.text}</span>

      {queuedCount > 0 && <Meta>+{queuedCount} message(s) queued</Meta>}
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
  }),
  queuedCount: PropTypes.number.isRequired
};

function Message({ timeout, message, index, dismissMessage, queuedCount }) {
  React.useEffect(() => {
    setTimeout(() => {
      dismissMessage(message.id);
    }, timeout);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <PureMessage index={index} message={message} queuedCount={queuedCount} />
  );
}

Message.propTypes = {
  timeout: PropTypes.number.isRequired,
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error']),
    title: PropTypes.string.isRequired,
    text: PropTypes.string
  }),
  index: PropTypes.number.isRequired,
  dismissMessage: PropTypes.func.isRequired,
  queuedCount: PropTypes.number.isRequired
};

export default Message;
