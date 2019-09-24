import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useSnackbar } from './SnackbarContext';

const Container = styled.aside``;

const Message = styled.div`
  position: fixed;
  bottom: ${props => 1 + props.index * 4.5 + 'rem'};
  left: 1rem;
  opacity: 1;
  background-color: red;
  margin: 0;
  padding: 1rem;
  border: 1px solid;
  transition: all 250ms ease-in-out;

  &.msg-enter {
    transform: translateX(-100%);
    opacity: 0;
  }
  &.msg-enter-active {
    transform: translateX(0);
    opacity: 1;
  }
  &.msg-exit {
    transform: translateX(0);
    opacity: 1;
  }
  &.msg-exit-active {
    transform: translateX(-100%);
    opacity: 0;
  }
`;

function SnackbarMessage({ timeout, message, index, dismissMessage }) {
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      dismissMessage(message.id);
    }, timeout);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const handleDismissMessage = e => {
    dismissMessage(e.target.getAttribute('data-msg-id'));
  };

  return (
    <Message key={message.id} index={index}>
      {message.text}

      <button data-msg-id={message.id} onClick={handleDismissMessage}>
        dismiss
      </button>
    </Message>
  );
}

SnackbarMessage.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })
  ),
  index: PropTypes.number.isRequired,
  dismissMessage: PropTypes.func.isRequired
};

function Snackbar({ timeout }) {
  const [snackbarState, snackbarDispatch] = useSnackbar();
  console.log('snackbarState: ', snackbarState);

  const dismissMessage = id => {
    snackbarDispatch({
      type: 'DEQUEUE_SNACKBAR_MSG',
      data: id
    });
  };

  return ReactDOM.createPortal(
    <TransitionGroup component={Container}>
      {snackbarState.map((message, i) => {
        return (
          <CSSTransition key={message.id} timeout={250} classNames="msg">
            <SnackbarMessage
              timeout={timeout}
              message={message}
              index={i}
              dismissMessage={dismissMessage}
            />
          </CSSTransition>
        );
      })}
    </TransitionGroup>,
    document.body
  );
}

Snackbar.propTypes = {
  timeout: PropTypes.number
};

Snackbar.defaultProps = {
  timeout: 8e3
};

export default Snackbar;
